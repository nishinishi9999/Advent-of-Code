module Main where

import Data.Maybe (isJust, fromJust)
import Data.Digest.Pure.MD5 (md5)
import Data.ByteString.Lazy.Char8 (pack, unpack)
import Debug.Trace

to_md5 :: [Char] -> [Char]
to_md5 = show . md5 . pack

to_md5' :: Int -> [Char] -> [Char]
to_md5' n str
  | n == 2017 = str
  | otherwise = to_md5' (n+1) (to_md5 str)

has_five :: Char -> [Char] -> Bool
has_five c str
  | length str < 5           = False
  | all (==c) . take 5 $ str = True
  | otherwise = has_five c (tail str)

find_three :: [Char] -> Maybe Char
find_three str
  | length str < 3   = Nothing
  | a == b && a == c = Just a
  | otherwise = find_three $ tail str
  where (a:b:c:_) = str

next_have_five :: Char -> Int -> Int -> (Int -> [Char]) -> Bool
next_have_five c n m f_md5
  | m == 1000         = False
  | has_five c digest = True
  | otherwise         = next_have_five c n (m+1) f_md5
  where digest = f_md5 (n+m)

find_key :: Int -> Int -> (Int -> [Char]) -> Int
find_key n found f_md5
  | found == 1 = n-1
  | otherwise  = find_key (n+1) (if is_key then found+1 else found) f_md5
  where is_key = isJust c && next_have_five (fromJust c) n 1 f_md5
        c      = find_three digest
        digest = f_md5 n

main :: IO ()
main = print second -- [first, second]
  where first  = find_key 0 0 (to_md5 . (salt++) . show)
        second = find_key 0 0 (map (to_md5' 0 . (salt++) . show) [0..] !!)
        salt  = "jlmsuwbz"

