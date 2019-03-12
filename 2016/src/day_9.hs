module Day_9 where

import Data.List.Split (splitOn)
import System.IO
import Debug.Trace

data Sequence a n times = Charseq a | Marker n times
  deriving Show

format_input' :: [Char] -> [Sequence Int Int Int]
format_input' str
  | null . head . head $ parts = seqs
  | otherwise                  = (Charseq . length . head . head $ parts) : seqs
  where seqs             = (concatMap to_sequence . tail $ parts)
        parts            = map (splitOn ")") . splitOn "(" . concat . words $ str
        to_int n         = read n ::Int
        to_marker marker = Marker n times
          where [n, times] = map to_int . splitOn "x" $ marker
        to_sequence part = case null . last $ part of
           True  -> [ to_marker . head $ part ]
           False -> [ to_marker . head $ part, Charseq . length . last $ part ]

format_input :: [Char] -> [Sequence [Char] Int Int]
format_input str = (Charseq . head . head $ parts) : (concatMap to_sequence . tail $ parts)
  where parts            = map (splitOn ")") . splitOn "(" . concat . words $ str
        to_int n         = read n ::Int
        to_marker marker = Marker n times
          where [n, times] = map to_int . splitOn "x" $ marker
        to_sequence part = case null . last $ part of
           True  -> [ to_marker . head $ part ]
           False -> [ to_marker . head $ part, Charseq . last $ part ]



marker_to_str :: Sequence [Char] Int Int -> [Char]
marker_to_str (Marker n times) = "(" ++ (show n) ++ "x" ++ (show times) ++ ")"

-- Second
decompress' :: [Sequence [Char] Int Int] -> [Char]
decompress' seqs
  | length seqs == 1 = from_charseq . head $ seqs
    where from_charseq (Charseq n) = n
  | otherwise = case head seqs of
    Charseq len    -> decompress' len + 
    Marker n times -> decompress'
      where next_is_charseq = case seqs!!1 of
        Charseq len    = True
        Marker n times = False

-- First
get_seq_len :: [[Char]] -> Int -> [Sequence [Char] Int Int] -> ([Char], Int)
get_seq_len acc _ [] = (concat . reverse $ acc, length acc)
get_seq_len acc n (seq:seqs)
  | n <= 0    = (concat . reverse $ acc, length acc)
  | otherwise = get_seq_len (seq' : acc) (n-len) seqs
  where len  = length seq'
        seq' = case seq of
          Charseq str    -> str
          Marker n times -> marker_to_str seq

decompress :: [Sequence [Char] Int Int] -> [Char]
decompress [] = []
decompress seqs = case head seqs of
  Charseq str    -> str    ++ (decompress . tail         $ seqs)
  Marker n times -> a ++ b ++ (decompress . drop (len+1) $ seqs)
      where (seq_str, len) = get_seq_len [] n (tail seqs)
            a = concat . take times . repeat . take n $ seq_str
            b = drop n seq_str

main :: IO ()
main = do
  --input <- openFile "../input/day_9.txt" ReadMode >>= hGetContents
  let input = "(27x12)(20x12)(13x14)(7x10)(1x12)A"
  let seqs  = format_input input
  let seqs' = format_input' input
  let first = decompress seqs
  let second = decompress' [] seqs'
  
  print seqs'

