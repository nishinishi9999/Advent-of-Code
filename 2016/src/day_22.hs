module Main where

import Data.List.Split (splitOn)
import System.IO

data Node = Node {
    _pos    :: (Int, Int)
  , _size   :: Int
  , _used   :: Int
  , _avail  :: Int
  , _in_use :: Int
} deriving Show

parse_input :: [Char] -> [Node]
parse_input = map (to_node . words) . lines
  where to_int n        = read n :: Int
        to_tuple [a, b] = (a, b)
        get_pos         = to_tuple . reverse . map (to_int . tail) . drop 1 . splitOn "-"
        to_node line    = Node {
            _pos    = get_pos $ line!!0
          , _size   = to_int . init $ line!!1
          , _used   = to_int . init $ line!!2
          , _avail  = to_int . init $ line!!3
          , _in_use = to_int . init $ line!!4
        }

find_valid :: [Node] -> Int
find_valid (node:nodes)
  | null nodes = 0
  | otherwise  = length valid + find_valid nodes
  where valid = filter (is_valid node) nodes
        is_valid node node' = _used node /= 0 && _used node <= _avail node'
          || _used node' /= 0 && _used node' <= _avail node

main :: IO ()
main = do
  input <- openFile "../input/day_22.txt" ReadMode >>= hGetContents
  let nodes = parse_input input
  let first = find_valid nodes
  print first

