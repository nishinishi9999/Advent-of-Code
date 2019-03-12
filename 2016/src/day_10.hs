module Main where

import Data.List (sort)
import qualified Data.Vector as V
import System.IO
import Debug.Trace

type T_Bots   = V.Vector (V.Vector Int)
type T_Instr  = Instr Int Int Int Int Int
type T_Output = V.Vector (Maybe Int)

data Output n = Output n | Bot n
  deriving Show

data Instr n from to low_to high_to =
    ValueTo    n (Output to)
  | GiveTo  from (Output low_to) (Output high_to)
  deriving Show

parse_input :: [Char] -> [Instr Int Int Int Int Int]
parse_input = map to_instr . map words . lines
  where to_int n      = read n ::Int
        to_instr line = case line!!0 of
          "value" -> ValueTo (to_int $ line!!1) $ Bot (to_int $ line!!5)
          "bot"   -> GiveTo  (to_int $ line!!1) output_low output_high
            where output_low  = (if line!!5  == "bot" then Bot else Output) $ to_int $ line!!6
                  output_high = (if line!!10 == "bot" then Bot else Output) $ to_int $ line!!11

bot_sort :: T_Bots -> Int -> T_Bots
bot_sort bots from = V.update bots $ V.singleton(from, bot)
  where bot = V.fromList . sort . V.toList $ bots V.! from

bot_push :: T_Bots -> Int -> Int -> T_Bots
bot_push bots to val = V.update bots $ V.singleton (to, bot)
  where bot = V.cons val $ bots V.! to

bot_shift :: T_Bots -> Int -> T_Bots
bot_shift bots from = V.update bots $ V.singleton (from, V.drop 1 $ bots V.! from)

exec_instr :: T_Bots -> T_Output -> Int -> Output Int -> (T_Bots, T_Output)
exec_instr bots out from to = case to of
  (Bot to')    -> (bot_shift bots' from, out)
    where bots' = bot_push bots to' val
  (Output to') -> (bot_shift bots from, out')
    where out'  = V.update out $ V.singleton (to', Just val)
  where val = bots V.! from V.! 0

exec :: [T_Instr] -> T_Bots -> T_Output -> (T_Bots, T_Output)
exec []        bots out = (bots, out)
exec (i:instr) bots out = case i of
  ValueTo n (Bot to)    -> exec instr (bot_push bots to n) out
  GiveTo from l_to h_to -> case (V.length $ bots V.! from) == 2 of
    -- Can execute instruction
    True -> exec instr bots'' out''
      where sorted          = bot_sort bots from
            (bots',  out' ) = exec_instr sorted out  from l_to
            (bots'', out'') = exec_instr bots'  out' (if l_matches && h_matches then traceShow from from else from) h_to
            l_matches = (sorted V.! from V.! 0) == 17
            h_matches = (bots'  V.! from V.! 0) == 61
    -- Can't execute instruction
    False -> exec (instr++[i]) bots out

main :: IO ()
main = do
  input <- openFile "../input/day_10.txt" ReadMode >>= hGetContents
  let instr = parse_input input
  let bots  = V.fromList [ V.fromList [] | GiveTo _ _ _ <- instr] 
  let out   = V.fromList [ Nothing | GiveTo _ _ _ <- instr] 
  
  let (bots', out') = exec instr bots out

  print $ V.take 3 out'

