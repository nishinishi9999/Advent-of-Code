module Day_6 where

import System.IO
import Data.List (sort, sortBy, group)

sort_by_length :: [String] -> [String]
sort_by_length = sortBy (\a b -> compare (length b) (length a))

main :: IO ()
main = do
  input <- openFile "../input/day_6.txt" ReadMode >>= hGetContents
  let lines   = words input
  let grouped = map (\i -> map (\line -> line!!i) $ lines) [0..7]
  let first   = map (\line -> head . head . sort_by_length . group . sort $ line) $ grouped
  let second  = map (\line -> head . last . sort_by_length . group . sort $ line) $ grouped
  print [first, second]

