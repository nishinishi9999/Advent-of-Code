module Day_4 where

import System.IO
import Data.List (sort, sortBy, group, elemIndex, isInfixOf)

data Room = Room {
    string   ::[Char]
  , name     ::[Char]
  , sector   ::Int
  , checksum ::[Char]
} deriving Show

format_input :: [Char] -> [Room]
format_input input = map to_room parts
  where parts = words input
        to_room      part = Room { string = part, name = get_name part, sector = get_sector part, checksum = get_checksum part }
        get_name     part = take (length part - 11) $ part
        get_sector   part = read ( take 3 . drop (length part - 10) $ part ) ::Int
        get_checksum part = take 5 . drop (length part - 6) $ part

rotate_letter :: Int -> Char -> Char
rotate_letter n l = case index of
  Just i  -> a!!(mod (i+n) 26)
  Nothing -> '_'
  where a     = "abcdefghijklmnopqrstuvwxyz"
        index = elemIndex l a

decrypt :: Room -> Room
decrypt room = room { name = name' }
  where name' = map (\c -> if c == '-' then ' ' else rotate_letter (sector room) c) (name room)

is_valid :: Room -> Bool
is_valid room = (checksum room) == make_checksum (name room)
  where make_checksum  = concat . map (take 1) . take 5 . sort_by_length . group . sort . filter (/= '-') 
        sort_by_length = sortBy (\a b -> compare (length b) (length a))

main :: IO ()
main = do
  input <- openFile "../input/day_4.txt" ReadMode >>= hGetContents
  let rooms     = format_input input
  let valid     = filter is_valid $ rooms
  let decrypted = map decrypt valid
  let first  = foldr (\room acc -> acc + (sector room)) 0 valid
  let second = (!!0) $ filter (\str -> isInfixOf "north" str) $ map (\room -> (name room) ++ " " ++ show (sector room)) decrypted
  print (first, second)

