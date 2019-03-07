module Day_7 where

import System.IO
import Data.List
import Data.List.Split (splitOn)

--format_line :: [Char] -> (String, String)
format_line str = (head parts ++ part_a, part_b)
  where parts  = splitOn "[" str
        part_a = concat . map (\part -> ("-" ++) . last . splitOn "]" $ part) . tail $ parts
        part_b = concat . map (\part -> ("-" ++) . head . splitOn "]" $ part) . tail $ parts

is_valid :: [Char] -> Bool
is_valid str
  | length str < 4             = False
  | a == d && b == c && a /= b = True
  | otherwise                  = is_valid (tail str)
  where (a:b:c:d:_) = str

is_valid' :: ([Char], [Char]) -> Bool
is_valid' (a, b) = 

main :: IO ()
main = do
  input <- openFile "../input/day_7.txt" ReadMode >>= hGetContents
  let lines = words input
  let ips   = map format_line lines
  
  let first = length . filter (\(a, b) -> (is_valid a) && (not . is_valid $ b)) $ ips

  print first

