module Main where

import qualified Data.Set as S
import Debug.Trace

find_elf :: [Int] -> [Int]
find_elf elves
  | len == 1  = elves
  | odd len   = find_elf . tail . remove_even $ traceShow len elves
  | otherwise = find_elf . remove_even $ traceShow len elves
  where len         = length elves
        remove_even = reverse . snd . foldl (\(i, acc) n -> (i+1, if even i then acc else n:acc)) (1, [])

find_elf' :: [Int] -> [Int]
find_elf' elves
  | len == 1  = elves
  | len == 2  = [0]-- [head elves]
  | odd len   = find_elf' . tail . traceShow len . reverse $ elves'
  | otherwise = find_elf' . traceShow len . reverse $ elves'
  where seen = S.empty
        len            = length elves
        (_, _, elves') = foldl remove_opposite (0, seen, []) elves
        remove_opposite (i, seen, acc) n = if S.member i seen then (i+1, seen, acc) else (i+1, S.insert j seen, n:acc)
          where j = mod (div (len-done_len) 2) (len-done_len) + i + done_len
                done_len = length seen

find_elf'' elves i
  | len == 1 = elves
  | otherwise      =
  where len = length elves
        j = mod (div len 2) len + (mod i len)

main :: IO ()
main = print second
  where elf_n  = 5 -- 3014603
        first  = find_elf' $ if odd elf_n then tail [1, 3..elf_n] else [1, 3..elf_n]
        second = find_elf [0..elf_n]

--   1
-- 5   2
--  4 3
--
--  5/2 = floor 2.5 = 2
--
--   1
-- 5   2
--  4 _
--
--  (5-1/2) = 2 + 1 = 3
--
--   1       1
-- _   2  
--  4 _    4   2
--
--  (5-2/2) = 1 + 2 = 3
--
--   _    2
-- _   2  
--  4 _   4
--
--
--  (5-3)/2 = 1 + 3 = 4 mod 2 = 0
--
