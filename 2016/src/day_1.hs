module Day_1 where

import Data.List.Split (splitOn)
import System.IO

data Dir a = Left' a | Right' a
  deriving Show

data Cardinal = North | East | South | West
  deriving (Show, Enum, Eq)

format_input :: [Char] -> [Dir Int]
format_input = (map to_dir) . parts
  where parts    = splitOn ", "
        to_int n = read n :: Int
        to_dir str
          | head str == 'L' = Left'  $ to_int $ tail str
          | otherwise       = Right' $ to_int $ tail str

move :: Int -> Int -> Cardinal -> Dir Int -> (Int, Int, Cardinal)
move h v c dir = (h', v', c')
   where
    (c', n) = case dir of
      Left'  n -> (if c == North then West  else pred c, n)
      Right' n -> (if c == West  then North else succ c, n)
    h' = if c' == East  then h+n else if c' == West  then h-n else h
    v' = if c' == South then v+n else if c' == North then v-n else v

{-
diff_v past v h acc f
  | b == 0    = (past, False, h, v')
  | otherwise = if (elem v' past) then (past, True, h, v') else diff_v (v':past) v' h (acc-1) f
    where v' = (f v)

diff_h past v h acc f
  | b == 0    = (past, False, h', v)
  | otherwise = if (elem v' past) then (past, True, h', v) else diff_h (h':past) v h' (acc-1) f
    where h' = (f h)
-}

first_twice :: [String] -> Int -> Int -> Cardinal -> [Dir Int] -> Int
first_twice past h v c (dir:dirs)
  | has_been  = abs $ h'' + v''
  | otherwise = first_twice past' h' v' c' dirs

distance :: Int -> Int -> Cardinal -> [Dir Int] -> Int
distance h v _ [] = abs $ h + v
distance h v c (dir:dirs) = distance h' v' c' dirs
    where (h', v', c') = move h v c dir

main :: IO ()
main = do
  input <- openFile "../input/day_1.txt" ReadMode >>= hGetContents
  let dirs   = format_input $ reverse $ (drop 1 $ reverse input)
  let first  = distance       0 0 North dirs
  let second = first_twice [] 0 0 North dirs
  print [first, second]

