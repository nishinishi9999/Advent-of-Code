module Main where

import Data.List (find)

data Disc = Disc { pos :: Int, mod' :: Int }
  deriving Show

find_s :: [Disc] -> Maybe Int
find_s d = find (are_valid d) [0..]
  where are_valid d t = snd $ foldl is_valid (t+1, True) d
        is_valid (t, b) (Disc pos mod') = if b
          then (t+1, mod (pos+t) mod' == 0)
          else (t, b)

main :: IO ()
main = print [first, second]
  where first  = find_s input
        second = find_s $ input ++ [Disc 0 11]
        input = map (\[a, b] -> Disc a b) [ [2, 5], [7, 13], [10, 17], [2, 3], [9, 19], [0, 7] ]

