module Day_3 where

import Data.List.Split (chunksOf)
import Data.List (sort)
import System.IO

data Triangle a b c = Triangle a b c
  deriving Show

sort_triangle :: Triangle Int Int Int -> Triangle Int Int Int
sort_triangle (Triangle a b c) = Triangle a' b' c'
  where [a', b', c'] = sort [a, b, c]

to_triangle :: [Int] -> Triangle Int Int Int
to_triangle [a, b, c] = Triangle a b c

format_input :: [Char] -> [Triangle Int Int Int]
format_input = map to_triangle . to_parts
  where to_int n = read n ::Int
        to_parts = chunksOf 3 . map to_int . words

to_cols :: [Triangle Int Int Int] -> [Triangle Int Int Int]
to_cols [Triangle a b c, Triangle d e f, Triangle g h i] =
  [ to_triangle [a, d, g], to_triangle [b, e, h], to_triangle [c, f, i] ];

is_pos_triangle :: Triangle Int Int Int -> Bool
is_pos_triangle (Triangle a b c) = a + b > c

main :: IO ()
main = do
  input <- openFile "../input/day_3.txt" ReadMode >>= hGetContents
  let triangles  = format_input input
  let triangles' = concatMap to_cols . chunksOf 3 $ triangles
  let first  = length . filter is_pos_triangle . map sort_triangle $ triangles
  let second = length . filter is_pos_triangle . map sort_triangle $ triangles'
  print [first, second]

