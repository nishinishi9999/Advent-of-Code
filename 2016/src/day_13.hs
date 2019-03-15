module Main where

import qualified Data.Set as S

data State = State {
    _input   :: Int
  , _target  :: (Int, Int)
  , _sources :: [(Int, Int)]
  , _visited :: S.Set (Int, Int)
} deriving Show

bin_len :: Int -> Int
bin_len n
  | n == 0 = 0
  | mod n 2 == 1 = 1 + bin_len (div n 2)
  | mod n 2 == 0 = 0 + bin_len (div n 2)

is_wall :: Int -> (Int, Int) -> Bool
is_wall input (y, x)
  | y < 0 || x < 0 = True
  | otherwise      = odd . bin_len $ n
  where n = x*x + 3*x + 2*x*y + y + y*y + input

-- First
try_adjacent :: (Int, Int) -> State -> State
try_adjacent (y, x) s = s { _visited = visited', _sources = sources' }
  where visited'     = S.union (S.fromList valid) (_visited s)
        sources'     = valid ++ (_sources s)
        valid        = filter is_valid [(y-1, x), (y+1, x), (y, x-1), (y, x+1)]
        is_valid pos = (not . has_been $ pos) && (not . is_wall' $ pos)
        is_wall'     = is_wall (_input s)
        has_been pos = S.member pos $ _visited s

find_path :: State -> Int -> Int
find_path s dist
  | S.member (_target s) (_visited s)      = dist - 0
  | null (_visited s) || null (_sources s) = 0
  | otherwise = find_path s' (dist+1)
  where s' = foldr try_adjacent (s { _sources = [] }) (_sources s)

-- Second
find_pos :: State -> Int -> Int
find_pos s dist
  | dist == 51 = length (_visited s)
  | otherwise  = find_pos s' (dist+1)
  where s' = foldr try_adjacent (s { _sources = [] }) (_sources s)

main :: IO ()
main = print [first, second]
  where first  = find_path s 0
        second = find_pos s 1
        s = State {
            _input   = 1350
          , _target  = (39, 31)
          , _sources = [(1, 1)]
          , _visited = S.singleton (1, 1)
        }

