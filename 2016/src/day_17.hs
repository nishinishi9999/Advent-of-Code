module Main where

import Data.List (sortBy, minimumBy)
import Data.Digest.Pure.MD5 (md5)
import Data.ByteString.Lazy.Char8 (pack, unpack)

to_md5 :: [Char] -> [Char]
to_md5 = show . md5 . pack

pos_dir :: (Int, Int) -> [Char] -> [Bool]
pos_dir (y, x) d = [up, down, left, right]
  where digest = map (>='b') . take 4 . to_md5 $ d 
        up    = digest!!0 && y > 0
        down  = digest!!1 && y < 3
        left  = digest!!2 && x > 0
        right = digest!!3 && x < 3

--                /---------------+
--  If pos == target              |
--    Return path                 |
--  Else if no possible paths     |
--    Return empty string         |
--  Else                          |
--    Map possible paths          |
--    Filter empty strings        |
--    Return shortest path or ""  |
--      \-------------------------+
find_path :: (Int, Int) -> (Int, Int) -> [Char] -> [Char] -> ([Char] -> [Char] -> Ordering) -> [Char]
find_path pos@(y, x) target path pwd compare_f
  | pos == target       = path
  | null valid_subpaths = ""
  | otherwise           = minimumBy compare_f valid_subpaths
  where paths                      = pos_dir pos (pwd ++ path)
        subpaths                   = map subpath $ zip paths [('U', y-1, x), ('D', y+1, x), ('L', y, x-1), ('R', y, x+1)]
        subpath (b, (dir, y', x')) = if b then find_path (y', x') target (path ++ [dir]) pwd compare_f else ""
        valid_subpaths             = filter (/="") subpaths

main :: IO ()
main = print (first, second)
  where first  = find_path (0, 0) (3, 3) "" "rrrbmfta" (\a b -> compare (length a) (length b))
        second = length $ find_path (0, 0) (3, 3) "" "rrrbmfta" (\a b -> compare (length b) (length a))

