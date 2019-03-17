module Main where

import Data.List (any, find, all, sortBy)
import Data.List.Split (splitOn)
import Data.Maybe (isNothing)
import System.IO

format_input = sortBy (\[a, b] [c, d] -> compare a c) . map (map to_int . splitOn "-") . lines
  where to_int n = read n ::Int

-- Enclosed

reduce_enclosed [] = []
reduce_enclosed ([a, b]:ranges) = if is_enclosed
  then          reduce_enclosed ranges
  else [a, b] : reduce_enclosed ranges
  where is_enclosed = any (\[a', b'] -> a' < a && b' > b) ranges

-- Contiguous

remove_contiguous :: [Int] -> [[Int]] -> [[Int]]
remove_contiguous _ [] = []
remove_contiguous [a, b] ([a', b']:ranges)
  | abs (b-a') == 1 || abs (a'-b) == 1 = remove_contiguous [a, b] ranges
  | otherwise                          = [a', b'] : remove_contiguous [a, b] ranges

find_contiguous :: [Int] -> [[Int]] -> [[Int]]
find_contiguous _ [] = []
find_contiguous [a, b] ([a', b']:ranges)
  | abs (b-a') == 1 || abs (a'-b) == 1 = [a', b'] : find_contiguous [a, b] ranges
  | otherwise                          = find_contiguous [a, b] ranges

reduce_contiguous :: [[Int]] -> [[Int]]
reduce_contiguous [] = []
reduce_contiguous (range:ranges)
  | null contiguous = range : reduce_contiguous ranges
  | otherwise       = (join_contiguous $ range:contiguous) : reduce_contiguous ranges'
  where contiguous             = find_contiguous   range ranges
        ranges'                = remove_contiguous range ranges
        join_contiguous ranges = [ minimum . map head $ ranges, maximum . map last $ ranges ]

-- Intersecting

find_intersecting :: [Int] -> [[Int]] -> (Maybe [Int], [[Int]])
find_intersecting _      [] = (Nothing, [])
find_intersecting [a, b] ([a', b']:ranges)
  | a < a' && b < b' && b > a' || a > a' && b > b' && b' > a = (Just [a', b'], ranges)
  | otherwise = (if isNothing found then Nothing else found, [a', b'] : range')
  where (found, range') = find_intersecting [a, b] ranges

reduce_intersecting :: [[Int]] -> [[Int]]
reduce_intersecting [] = []
reduce_intersecting (range:ranges)
  | isNothing intersecting = range  : reduce_intersecting ranges
  | otherwise              = range' : reduce_intersecting ranges'
  where (intersecting, ranges')      = find_intersecting range ranges
        range'                       = join_intersecting intersecting
        join_intersecting (Just int) = [ min (head range) (head int), max (last range) (last int) ]

reduce_ranges :: [[Int]] -> [[Int]]
reduce_ranges ranges = if length ranges == length ranges' then ranges else reduce_ranges ranges'
  where ranges' = reduce ranges
        reduce  = reduce_intersecting' . reduce_contiguous' . reduce_enclosed'
        reduce_enclosed'     = reverse . reduce_enclosed     . reverse . reduce_enclosed
        reduce_contiguous'   = reverse . reduce_contiguous   . reverse . reduce_contiguous
        reduce_intersecting' = reverse . reduce_intersecting . reverse . reduce_intersecting

find_first ([a, b]:[a', b']:ranges)
  | null ranges = 0
  | a'-b > 1    = b+1
  | otherwise   = find_first ranges

find_all ([a, b]:[a', b']:ranges)
  | null ranges = (a'-b)
  | otherwise   = (a'-b) + find_all ranges

main :: IO ()
main = do
  input <- openFile "../input/day_20.txt" ReadMode >>= hGetContents
  let ranges  = format_input input
  let ranges' = reduce_ranges ranges 
  let first   = find_first ranges'
  let second  = find_all ranges'
  print [first, second]

