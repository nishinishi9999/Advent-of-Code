module Main where

import Data.List (sort)
import Data.Char (isNumber)
import Data.Digest.Pure.MD5 (md5)
import Data.ByteString.Lazy.Char8 (pack, unpack)

to_md5 :: [Char] -> [Char]
to_md5 = show . md5 . pack

find_pwd' :: [(Int, Char)] -> Int -> [Char] -> [Char]
find_pwd' acc n input
  | length acc == 8 = map snd . sort $ acc
  | otherwise       = case is_valid && is_valid_pos of
    True  -> find_pwd' ((pos', c):acc) (n+1) input
    False -> find_pwd' acc               (n+1) input
    where hash         = to_md5 $ input ++ (show $ n+1)
          (pos, c)     = ( hash!!5, hash!!6 )
          pos'         = read [pos] ::Int
          is_valid     = take 5 hash == "00000"
          is_valid_pos = isNumber pos && pos' > 0 && pos' < 8 && ( not . any ((==pos') . fst) $ acc )

find_pwd :: [Char] -> Int -> [Char] -> [Char]
find_pwd acc n input
  | length acc == 8 = reverse acc
  | otherwise       = case is_valid of
    True  -> find_pwd (hash!!5:acc) (n+1) input
    False -> find_pwd acc           (n+1) input
    where hash     = to_md5 $ input ++ (show $ n+1)
          is_valid = take 5 hash == "00000"

main :: IO ()
main = print [first]
  where input  = "abc"
        first  = find_pwd  "" 0 input
        second = find_pwd' [] 0 input

