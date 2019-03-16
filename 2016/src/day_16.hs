module Main where

import Data.List.Split (chunksOf)
import Data.Bool (bool)

import Data.List (find, all)
import Data.Maybe (isNothing, fromJust)

gen_data :: [Bool] -> Int -> [Bool]
gen_data d len
  | length d >= len = take len d
  | otherwise       = gen_data d' len
  where d' = d ++ False : foldl (\acc b -> not b : acc) [] d

make_checksum :: [Bool] -> [Bool]
make_checksum d
  | odd . length $ d = d
  | otherwise        = make_checksum . make_checksum' $ d
  where make_checksum' []       = []
        make_checksum' (a:b:d') = (a == b) : make_checksum' d'

fill_space :: [Bool] -> Int -> [Bool]
fill_space d len = make_checksum $ gen_data d len

main :: IO ()
main = print [first, second]
  where first  = map (bool '0' '1') $ fill_space input_b input_len
        second = map (bool '0' '1') $ fill_space input_b 35651584
        input_b   = map (=='1') "11101000110010100"
        input_len = 272

