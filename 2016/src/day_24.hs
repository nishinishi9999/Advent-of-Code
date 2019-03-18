module Main where

import Data.List (sort)
import qualified Data.Set as S
import System.IO

data Cell = Wall | Floor | Digit Int
  deriving (Eq, Show)

data State = State {
    _maze    :: [[Cell]]
  , _sources :: [(Int, Int)]
  , _visited :: S.Set (Int, Int)
}

type DigitPos = (Int, Int, (Int, Int))

parse_input :: [Char] -> [[Cell]]
parse_input = map (map to_cell) . lines
  where to_cell c = case c of
                      '#' -> Wall
                      '.' -> Floor
                      _   -> Digit (read [c] :: Int)

can_move :: State -> (Int, Int) -> Bool
can_move s (y, x) = case _maze s!!y!!x of
  Wall -> False
  _    -> not . S.member (y, x) $ _visited s

move_adjacent :: State -> (Int, Int) -> State
move_adjacent s (y, x) = s { _sources = pos_adjacent ++ _sources s, _visited = S.union (S.fromList adjacent) (_visited s) }
  where pos_adjacent = filter (\(y', x') -> can_move s (y', x')) adjacent 
        adjacent     = [(y-1, x), (y+1, x), (y, x-1), (y, x+1)]

find_digits :: State -> [DigitPos] -> Int -> [DigitPos]
find_digits s digits dist
  | null . _sources $ s'       = digits
  | not . null $ source_digits = find_digits s' (digits ++ map digit_to_tuple source_digits) (dist+1)
  | otherwise                  = find_digits s' digits (dist+1) 
  where s'            = foldl move_adjacent (s { _sources = [] }) $ _sources s
        maze          = _maze s
        source_digits = filter (\(cell, _) -> cell /= Wall && cell /= Floor) . map (\(y, x) -> (maze!!y!!x, (y, x))) $ _sources s'
        digit_to_tuple (Digit n, (y, x)) = (n, dist+1, (y, x))

find_rel_dist :: State -> [(Int, [(Int, Int)])]
find_rel_dist s = map (\(n, _, pos) -> (n, remove_pos $ find_digits (s { _sources = [pos], _visited = S.singleton pos }) [] 0)) init
  where init                = find_digits s [] 0
        set_s s (n, _, pos) = s { _sources = [pos] }
        remove_pos          = map (\(n, dist, _) -> (n, dist))

find_shortest :: [(Int, [(Int, Int)])] -> [(Int, Int)] -> [Int] -> Int -> Int
find_shortest rel_dist rel visited dist
  | null left = dist
  | otherwise = minimum . map (\(n, dist') -> find_shortest rel_dist (snd $ rel_dist!!n) (n:visited) (dist+dist')) $ left
  where left = filter (\(n, _) -> notElem n visited) rel

find_shortest' :: [(Int, [(Int, Int)])] -> [(Int, Int)] -> [Int] -> Int -> Int
find_shortest' rel_dist rel visited dist
  | null left = dist + (snd . (!!0) . filter (\(n, _) -> n == 0) $ rel)
  | otherwise = minimum . map (\(n, dist') -> find_shortest' rel_dist (snd $ rel_dist!!n) (n:visited) (dist+dist')) $ left
  where left = filter (\(n, _) -> notElem n visited) rel

main :: IO ()
main = do
  input <- openFile "../input/day_24.txt" ReadMode >>= hGetContents
  let init_pos = (1, 1)
  let s = State {
      _maze    = parse_input input
    , _sources = [init_pos]
    , _visited = S.singleton init_pos
  }
  let dist   = sort $ find_rel_dist s
  let first  = find_shortest  dist (snd . head $ dist) [0] 0
  let second = find_shortest' dist (snd . head $ dist) [0] 0

  print [first, second]

