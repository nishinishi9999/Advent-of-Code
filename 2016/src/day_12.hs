module Main where

import qualified Data.Vector as V
import qualified Data.Vector.Unboxed as U
import Data.Char (ord)
import System.IO
import Debug.Trace

data Arg = Reg Int | Int' Int
  deriving Show

data Opcode = Cpy Arg Arg | Inc Arg | Dec Arg | Jnz Arg Arg
  deriving Show

data State = State {
    op  :: V.Vector Opcode
  , i   :: Int
  , reg :: U.Vector Int
} deriving Show

type Regs = V.Vector Int

format_input :: [Char] -> V.Vector Opcode
format_input = V.fromList . map (to_instr . words) . lines
  where to_int n = read n ::Int
        parse_arg str = if last str < 'a'
          then Int' . to_int                   $ str
          else Reg  . subtract 97 . ord . head $ str
        to_instr line = case head line of
          "cpy" -> Cpy (parse_arg $ line!!1) (parse_arg $ line!!2)
          "inc" -> Inc (parse_arg $ line!!1)
          "dec" -> Dec (parse_arg $ line!!1)
          "jnz" -> Jnz (parse_arg $ line!!1) (parse_arg $ line!!2)

-- Utility functions

reg_update :: State -> Int -> Int -> State
reg_update s r val = s { reg = U.update (reg s) $ U.singleton (r, val) }

get_val :: State -> Arg -> Int
get_val s arg = case arg of
  Reg  r -> reg s U.! r
  Int' n -> n

inc_i :: State -> State
inc_i s = s { i = succ (i s) }

-- Opcodes

cpy :: State -> Arg -> Arg -> State
inc :: State -> Arg -> State
dec :: State -> Arg -> State
jnz :: State -> Arg -> Arg -> State

cpy s a (Reg r) = reg_update s r val
  where val = get_val s a

inc s (Reg r) = reg_update s r val
  where val = succ $ reg s U.! r

dec s (Reg r) = reg_update s r val
  where val = pred $ reg s U.! r

jnz s a (Int' b)
  | val /= 0  = s { i = i s + b - 1 }
  | otherwise = s
  where val = get_val s a

-- Execution

exec :: State -> State
exec s
  | i s < 0 || i s >= V.length (op s) = s
  | otherwise = exec . inc_i $ case op s V.! i s of
    Cpy a b -> cpy s a b
    Inc a   -> inc s a
    Dec a   -> dec s a
    Jnz a b -> jnz s a b

main :: IO ()
main = do
  input <- openFile "../input/day_12.txt" ReadMode >>= hGetContents
  let s = State {
      op  = format_input input
    , i   = 0
    , reg = U.fromList [ 0 | _ <- [0..5] ]
  }

  let first  = U.head . reg . exec $ s
  let second = U.head . reg . exec $ reg_update s 2 1

  print $ [first, second]

