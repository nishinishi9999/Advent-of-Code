module Main where

import Data.List.Split (splitOn)
import qualified Data.Set as S
import System.IO

data Dir a = Left' a | Right' a
  deriving Show

data Cardinal = North | East | South | West
  deriving (Show, Enum, Eq)

format_input :: [Char] -> [Dir Int]
format_input = map to_dir . parts
  where to_int n = read n :: Int
        parts    = splitOn ", "
        to_dir str = case head str of
          'L' -> Left'  . to_int . tail $ str
          'R' -> Right' . to_int . tail $ str

move :: (Int, Int) -> Cardinal -> Dir Int -> ((Int, Int), Cardinal)
move (y, x) c dir = ((y', x'), c')
   where
    (c', n) = case dir of
      Left'  n -> (if c == North then West  else pred c, n)
      Right' n -> (if c == West  then North else succ c, n)
    (y', x') = case c' of
      North -> (y-n, x)
      East  -> (y, x+n)
      South -> (y+n, x)
      West  -> (y, x-n)

step :: Int -> (S.Set (Int, Int), Bool, (Int, Int), Cardinal) -> (S.Set (Int, Int), Bool, (Int, Int), Cardinal)
step n (past, has_been, (y, x), c)
  | has_been  = (past, has_been, (y, x), c)
  | otherwise = if S.member pos past then (past, True, pos, c) else (S.insert pos past, False, (y, x), c)
    where pos = case c of
           North -> (n, x)
           East  -> (y, n)
           South -> (n, x)
           West  -> (y, n)

first_twice :: S.Set (Int, Int) -> (Int, Int) -> Cardinal -> [Dir Int] -> Int
first_twice past (y, x) c [] = 0
first_twice past (y, x) c (dir:dirs)
  | has_been  = abs $ twice_y + twice_x
  | otherwise = first_twice past' (y', x') c' dirs
  where ((y', x'), c') = move (y, x) c dir
        (past', has_been, (twice_y, twice_x), _) = foldr step (past, False, (y, x), c') . tail $ case c' of
          North -> reverse [y'..y]
          East  -> [x..x']
          South -> [y..y']
          West  -> reverse [x'..x]

distance :: (Int, Int) -> Cardinal -> [Dir Int] -> Int
distance (y, x) _ []         = abs $ y + x
distance (y, x) c (dir:dirs) = distance (y', x') c' dirs
    where ((y', x'), c') = move (y, x) c dir

main :: IO ()
main = do
  input <- openFile "../input/day_1.txt" ReadMode >>= hGetContents
  let dirs   = format_input input
  let first  = distance (0, 0) North dirs
  let second = first_twice S.empty (0, 0) North dirs
  print (first, second)

