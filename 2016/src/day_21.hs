module Main where

import qualified Data.Vector as V
import Data.Maybe (isNothing, fromJust)
import System.IO

data Dir = Left' | Right'
  deriving (Eq, Show)

data Op =
    SwapPos     Int  Int
  | SwapLetter  Char Char
  | RotateDir   Dir  Int
  | RotatePos   Char
  | Reverse     Int  Int
  | Move        Int  Int
  deriving Show

type InputStr = V.Vector Char

parse_input :: [Char] -> [Op]
parse_input = map (to_op . words) . lines
  where to_int n   = read n ::Int
        to_op line = case line!!0 of
          "swap"    -> case line!!1 of
            "position" -> SwapPos (to_int $ line!!2) (to_int $ line!!5)
            "letter"   -> SwapLetter (line!!2!!0) (line!!5!!0)
          "rotate"  -> if line!!1 == "based"
            then RotatePos (line!!6!!0)
            else RotateDir (if line!!1 == "left" then Left' else Right') (to_int $ line!!2)
          "reverse" -> Reverse (to_int $ line!!2) (to_int $ line!!4)
          "move"    -> Move    (to_int $ line!!2) (to_int $ line!!5)

swappos :: InputStr -> Int -> Int -> InputStr
swappos str n m = V.update (V.update str $ V.singleton (n, b)) $ V.singleton (m, a)
  where [a, b] = [str V.! n, str V.! m]

swapletter :: InputStr -> Char -> Char -> InputStr
swapletter str a b
  | isNothing index_a || isNothing index_b = V.empty
  | otherwise = swappos str (fromJust index_a) (fromJust index_b)
  where index_a = V.findIndex (==a) str
        index_b = V.findIndex (==b) str

rotatedir :: InputStr -> Dir -> Int -> InputStr
rotatedir str dir n = case dir of
  Left'  -> V.concat [V.drop n str, V.take n str]
  Right' -> V.concat [V.drop m str, V.take m str]
    where m = V.length str - n

rotatepos :: InputStr -> Char -> InputStr
rotatepos str c
  | isNothing index = V.empty
  | otherwise = rotatedir str Right' $ mod ( index' + 1 + (if index' >= 4 then 1 else 0) ) (length str)
  where index  = V.findIndex (==c) str
        index' = fromJust index

rotatepos' :: InputStr -> Char -> Int -> InputStr
rotatepos' str c i
  | rotatepos str' c == str = str'
  | otherwise = rotatepos' str c (i+1)
  where str' = rotatedir str Left' i

reverse' :: InputStr -> Int -> Int -> InputStr
reverse' str n m = V.concat [V.take n str, V.reverse $ V.slice n (m-n+1) str, V.drop (m+1) str]

move :: InputStr -> Int -> Int -> InputStr
move str n m = V.concat [ V.take m str', V.singleton c, V.drop m str']
  where c    = str V.! n
        str' = V.concat [ V.take n str, V.drop (n+1) str ]

exec :: [Op] -> InputStr -> InputStr
exec []       str = str
exec (op:ops) str = exec ops $ case op of
  SwapPos      n m -> swappos    str   n m
  SwapLetter   a b -> swapletter str   a b
  RotateDir  dir n -> rotatedir  str dir n
  RotatePos      c -> rotatepos  str     c
  Reverse      n m -> reverse'   str   n m
  Move         n m -> move       str   n m

exec' :: [Op] -> InputStr -> InputStr
exec' []       str = str
exec' (op:ops) str = exec' ops $ case op of
  SwapPos      n m -> swappos    str n m
  SwapLetter   a b -> swapletter str a b
  RotateDir  dir n -> rotatedir  str (if dir == Left' then Right' else Left') n
  RotatePos      c -> rotatepos' str c 0
  Reverse      n m -> reverse'   str n m
  Move         n m -> move       str m n

main :: IO ()
main = do
  input <- openFile "../input/day_21.txt" ReadMode >>= hGetContents
  let ops    = parse_input input
  let first  = exec ops str
  let second = exec' (reverse ops) str'
  print [first, second]
    where str  = V.fromList "abcdefgh"
          str' = V.fromList "fbgdceah"

