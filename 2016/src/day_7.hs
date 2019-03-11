module Day_7 where

import System.IO
import Data.List (isInfixOf)
import Data.List.Split (splitOn)

format_line :: [Char] -> (String, String)
format_line str = (head parts ++ part_a, part_b)
  where parts  = splitOn "[" str
        part_a = concatMap (("-" ++) . last . splitOn "]") . tail $ parts
        part_b = concatMap (("-" ++) . head . splitOn "]") . tail $ parts

is_valid :: [Char] -> Bool
is_valid str
  | length str < 4             = False
  | a == d && b == c && a /= b = True
  | otherwise                  = is_valid (tail str)
  where (a:b:c:d:_) = str

is_valid' :: (String, String) -> Bool
is_valid' (outside, inside)
  | length outside < 3                  = False
  | a == c && b /= a && has_inverse a b = True
  | a == '-' || b == '-' || c == '-'    = is_valid' (tail outside, inside)
  | otherwise                           = is_valid' (tail outside, inside)
  where (a:b:c:_)       = outside
        has_inverse a b = isInfixOf [b, a, b] inside

main :: IO ()
main = do
  input <- openFile "../input/day_7.txt" ReadMode >>= hGetContents
  let lines = words input
  let ips   = map format_line lines
  
  let first  = length . filter (\(a, b) -> is_valid a && (not . is_valid $ b)) $ ips
  let second = length . filter is_valid' $ ips
  print [first, second]

