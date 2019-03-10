module Day_2 where

import System.IO

data Dir = DirUp | DirRight | DirDown | DirLeft
  deriving Show

parse_input :: [Char] -> [[Dir]]
parse_input = map (map to_dir .head . words) . lines
  where to_dir c = case c of
                    'U' -> DirUp
                    'R' -> DirRight
                    'D' -> DirDown
                    'L' -> DirLeft

get_key :: [Dir] -> (Int, Int) -> [[Maybe Char]] -> (Maybe Char, (Int, Int))
get_key         [] (y, x) keypad = (keypad!!y!!x, (y, x))
get_key (dir:dirs) (y, x) keypad = case dir of
  DirUp    -> get_key dirs (   if isNothing up_key    then y else y-1, x) keypad
  DirRight -> get_key dirs (y, if isNothing right_key then x else x+1   ) keypad
  DirDown  -> get_key dirs (   if isNothing down_key  then y else y+1, x) keypad
  DirLeft  -> get_key dirs (y, if isNothing left_key  then x else x-1   ) keypad
  where up_key    = keypad!!(y-1)!!x
        right_key = keypad!!y!!(x+1)
        down_key  = keypad!!(y+1)!!x
        left_key  = keypad!!y!!(x-1)

foldr_dir :: ([Maybe Char], (Int, Int)) -> [Dir] -> [[Maybe Char]] -> ([Maybe Char], (Int, Int))
foldr_dir (acc, (y, x)) dirs keypad = ( n:acc, (y', x') )
  where (n, (y', x')) = get_key dirs (y, x) keypad

main :: IO ()
main = do
  input <- openFile "../input/day_2.txt" ReadMode >>= hGetContents
  let dirs   = parse_input input
  let keypad = to_keypad [ "     "
                         , " 123 "
                         , " 456 " 
                         , " 789 "
                         , "     " ]
  let keypad' = to_keypad [ "       "
                          , "   1   "
                          , "  234  "
                          , " 56789 "
                          , "  ABC  "
                          , "   D   "
                          , "       " ]

  let first  = fst . foldr (\dirs' acc -> foldr_dir acc dirs' keypad ) ( [], (2, 2) ) $ dirs
  let second = fst . foldr (\dirs' acc -> foldr_dir acc dirs' keypad') ( [], (3, 1) ) $ dirs
  mapM_ print [first, second]
    where to_keypad = map (map (\c -> if c == ' ' then Nothing else Just c))

