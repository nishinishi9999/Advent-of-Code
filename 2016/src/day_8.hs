module Main where

import System.IO
import Data.List.Split (splitOn)
import Data.Foldable (toList)
import qualified Data.Sequence as S

data Instruction =
    Rect { w ::Int, h ::Int }
  | Row  { y ::Int, n ::Int }
  | Col  { x ::Int, n ::Int }
    deriving Show

format_input :: [Char] -> [Instruction]
format_input input = map (to_instruction . words) parts
  where to_int n = read n ::Int
        parts = lines input
        to_instruction part = case head part of
          "rect" -> Rect w h
            where [w, h] = map to_int . splitOn "x" . last $ part
          _      -> case part!!1 of
            "row"    -> Row y n
              where [y, n] = map to_int [ drop 2 (part!!2), last part ]
            "column" -> Col x n
              where [x, n] = map to_int [ drop 2 (part!!2), last part ]

update_rect :: S.Seq (S.Seq Bool) -> Int -> Int -> S.Seq (S.Seq Bool)
update_rect s w h = foldr (\i acc -> S.update i (update_row' (S.index acc i)) acc) s [0..h-1]
  where update_row' row = foldr (\j acc -> S.update j True acc) row [0..w-1]

update_row :: S.Seq (S.Seq Bool) -> Int -> Int -> S.Seq (S.Seq Bool)
update_row s y n = S.update y row' s
  where row    = S.index s y
        row'   = b S.>< a
        (a, b) = S.splitAt (S.length row - n) row

update_col :: S.Seq (S.Seq Bool) -> Int -> Int -> S.Seq (S.Seq Bool)
update_col s x n = foldr (\i acc -> S.update i (update_index (S.index acc i) i) acc) s [0..len]
  where update_index row i = S.update x (next_index row i) row
        next_index   row i = S.index ( S.index s (mod (i-n) len) ) x
        len                = S.length s

exec_instr :: S.Seq (S.Seq Bool) -> [Instruction] -> S.Seq (S.Seq Bool)
exec_instr s [] = s
exec_instr s (instr:instrs) = case instr of
  Rect w h -> exec_instr (update_rect s w h) instrs
  Row  y n -> exec_instr (update_row  s y n) instrs
  Col  x n -> exec_instr (update_col  s x n) instrs

main :: IO ()
main = do
  input <- openFile "../input/day_8.txt" ReadMode >>= hGetContents
  let instr = format_input input
  let s     = S.fromList [ S.fromList [ False | _ <- [0..49] ] | _ <- [0..5] ]
  let s'    = exec_instr s instr
  let first  = sum . toList . fmap (length . S.filter id) $ s'
  let second = fmap (fmap (\b -> if b then '*' else ' ')) s'
  print first
  mapM_ putStrLn $ fmap toList second

