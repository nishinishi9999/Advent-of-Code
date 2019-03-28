module Main where

import qualified Data.Sequence as S

-- | First

find_elf :: [Int] -> Int
find_elf elves
  | len == 1  = head elves
  | odd len   = find_elf . tail . remove_even $ elves
  | otherwise = find_elf . remove_even $ elves
  where len         = length elves
        remove_even = reverse . snd . foldl (\(i, acc) n -> (i+1, if even i then acc else n:acc)) (1, [])

-- | Second
--
find_elf' :: S.Seq Int -> Int
find_elf' elves
  | len == 1  = S.index elves 0
  | otherwise = find_elf' elves''
  where len    = S.length elves
        j      = mod (div len 2) len
        elves'  = S.take j elves S.>< S.drop (j+1) elves
        elves'' = S.drop 1 elves' S.|> S.index elves' 0

main :: IO ()
main = print [first, second]
  where elf_n  = 3014603
        first  = find_elf $ if odd elf_n then tail [1, 3..elf_n] else [1, 3..elf_n]
        second = find_elf' (S.fromList [1..elf_n])

