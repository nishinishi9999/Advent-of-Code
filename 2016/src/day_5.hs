module Main where

import Data.List (sort)
import qualified Data.Set as S
import Data.Digest.Pure.MD5 (md5)
import Data.ByteString.Lazy.Char8 (pack, unpack)

to_md5 :: [Char] -> [Char]
to_md5 = show . md5 . pack

find_pwd' :: [(Char, Char)] -> S.Set Char -> Int -> [Char] -> [Char]
find_pwd' acc s n input
  | length acc == 8 = map snd . sort $ acc
  | otherwise       = if is_valid && is_valid_pos
    then find_pwd' ((pos, c):acc) (S.insert pos s)(n+1) input
    else find_pwd' acc            s               (n+1) input
    where hash         = to_md5 $ input ++ show (n+1)
          (pos, c)     = ( hash!!5, hash!!6 )
          is_valid     = take 5 hash == "00000"
          is_valid_pos = pos >= '0' && pos < '8' && ( not . S.member pos $ s )

find_pwd :: [Char] -> Int -> [Char] -> [Char]
find_pwd acc n input
  | length acc == 8 = reverse acc
  | otherwise       = if is_valid
    then find_pwd (hash!!5:acc) (n+1) input
    else find_pwd acc           (n+1) input
    where hash     = to_md5 $ input ++ show (n+1)
          is_valid = take 5 hash == "00000"

main :: IO ()
main = print [first, second]
  where input  = "abc"
        first  = find_pwd  ""         0 input
        second = find_pwd' [] S.empty 0 input

