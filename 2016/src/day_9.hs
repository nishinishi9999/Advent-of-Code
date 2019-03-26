module Main where

import Data.List.Split (splitOn)
import System.IO

type T_Sequence  = Sequence [Char] Int Int
type T_Sequence' = Sequence    Int Int Int

data Sequence a n times = Charseq a | Marker n times
  deriving Show

format_input' :: [Char] -> [T_Sequence']
format_input' str
  | null . head . head $ parts = seqs
  | otherwise                  = (Charseq . length . head . head $ parts) : seqs
  where seqs             = concatMap to_sequence . tail $ parts
        parts            = map (splitOn ")") . splitOn "(" . concat . words $ str
        to_int n         = read n ::Int
        to_marker marker = Marker n times
          where [n, times] = map to_int . splitOn "x" $ marker
        to_sequence part = if null . last $ part
           then [ to_marker . head $ part  ]
           else [ to_marker . head $ part, Charseq . length . last $ part ]

format_input :: [Char] -> [T_Sequence]
format_input str = (Charseq . head . head $ parts) : (concatMap to_sequence . tail $ parts)
  where parts            = map (splitOn ")") . splitOn "(" . concat . words $ str
        to_int n         = read n ::Int
        to_marker marker = Marker n times
          where [n, times] = map to_int . splitOn "x" $ marker
        to_sequence part = if null . last $ part
           then [ to_marker . head $ part ]
           else [ to_marker . head $ part, Charseq . last $ part ]


marker_to_str :: T_Sequence -> [Char]
marker_to_str (Marker n times) = "(" ++ show n ++ "x" ++ show times ++ ")"

-- First
get_seq_len :: [[Char]] -> Int -> [T_Sequence] -> ([Char], Int)
get_seq_len acc _ [] = (concat . reverse $ acc, length acc)
get_seq_len acc n (seq:seqs)
  | n <= 0    = (concat . reverse $ acc, length acc)
  | otherwise = get_seq_len (seq' : acc) (n-len) seqs
  where len  = length seq'
        seq' = case seq of
          Charseq str    -> str
          Marker n times -> marker_to_str seq

decompress :: [T_Sequence] -> [Char]
decompress [] = []
decompress seqs = case head seqs of
  Charseq str    -> str    ++ (decompress . tail         $ seqs)
  Marker n times -> a ++ b ++ (decompress . drop (len+1) $ seqs)
      where (seq_str, len) = get_seq_len [] n (tail seqs)
            a = concat . replicate times . take n $ seq_str
            b = drop n seq_str

-- Second
get_subseq :: [T_Sequence'] -> [T_Sequence'] -> Int -> Int -> ([T_Sequence'], Int)
get_subseq [] subseq target len
  | len == target  = (subseq, 0)
  | len   > target = (subseq, len - target)
  | otherwise = error "blah"

get_subseq (seq:seqs) subseq target len
  | len == target = (subseq, 0)
  | len  > target = (subseq, len - target)
  | otherwise     = get_subseq seqs (subseq ++ [seq]) target (len+sub_len)
  where from_charseq (Charseq n) = n
        sub_len = case seq of
          Charseq n   -> n
          Marker  m t -> length $ marker_to_str (Marker m t)

sub_subseq :: T_Sequence' -> T_Sequence' -> T_Sequence'
sub_subseq (Charseq n) (Charseq m) = Charseq (n - m)

decompress' :: [T_Sequence'] -> Int -> Int
decompress' seqs len
  | null seqs = len
  | otherwise = case head seqs of
    -- | Add 
    Charseq n   -> decompress' (tail seqs) $ len + n
    Marker  n t -> decompress' seqs''      $ len + t * decompress' subseq' 0
      where (subseq, carry) = get_subseq (tail seqs) [] n 0
            seqs'           = drop (length subseq + 1) seqs
            (subseq', seqs'') = if carry == 0
              then (subseq, seqs')
              else (init subseq ++ [sub_subseq (last subseq) (Charseq carry)], Charseq carry : seqs')

main :: IO ()
main = do
  input <- openFile "../input/day_9.txt" ReadMode >>= hGetContents
  let seqs  = format_input  input
  let seqs' = format_input' input
  let first  = length $ decompress  seqs
  let second = decompress' seqs' 0
  
  print [first, second]

