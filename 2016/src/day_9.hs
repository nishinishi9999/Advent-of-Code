module Day_9 where

import System.IO
import Data.List.Split (splitOn)

data Sequence str n times = Charseq str | Marker n times
  deriving Show

{-
 -
 - If char
 -  char
 - If parentheses
 -  if another parentheses
 -    remove and continue after that prentheses
 -  else
 -    decompress
-}

format_input :: [Char] -> [Sequence [Char] Int Int]
format_input str = foldr (++) [] . map to_sequence $ (tail parts)
  where parts            = map (splitOn ")") . (splitOn "(") $ str
        to_int n         = read n ::Int
        to_marker marker = Marker n times
          where (n:times:[]) = map to_int . splitOn "x" $ marker
        to_sequence part = case null . last $ part of
           True  -> [ Charseq . head $ part ]
           False -> [ to_marker . head $ part, Charseq . last $ part ]

marker_to_str :: Sequence [Char] Int Int -> [Char]
marker_to_str (Marker n times) = "(" ++ (show n) ++ "x" ++ (show times) ++ ")"

get_seq_len :: [Sequence [Char] Int Int] -> Int -> [Sequence [Char] Int Int] -> ([Char], Int)
get_seq_len acc _ []         = (concat . reverse $ acc, length acc)
get_seq_len acc 0 _          = (concat . reverse $ acc, length acc)
get_seq_len acc n (seq:seqs) = get_seq_len (seq' : acc) (n-len) seqs
  where len  = length seq'
        seq' = case seq of
          Charseq str    -> str
          Marker n times -> marker_to_str seq

decompress :: [Sequence [Char] Int Int] -> [Char]
decompress [] = []
decompress seqs = case head seqs of
  Charseq str    -> str    ++ (decompress . tail $ seqs)
  Marker n times -> a ++ b ++ (decompress . drop 2 $ seqs)
      where (seq_str, len) = get_seq_len [] n (tail seqs)
            a = concat . take times . repeat . take n $ seq_str
            b = drop n seq_str

main :: IO ()
main = do
  input <- openFile "../input/day_9.txt" ReadMode >>= hGetContents
  let seqs = format_input input
  let first = decompress seqs
  
  print $ length first

