module Main where

is_trap :: Bool -> Bool -> Bool -> Bool
is_trap a b c
  |        a &&     b && not c
    || not a &&     b &&     c
    ||     a && not b && not c
    || not a && not b &&     c = True
  | otherwise = False

gen_row :: Int -> [Bool] -> [Bool]
gen_row i row
    | i == length row     = [] 
    | i == 0              = is_trap False        (row!!0) (row!!1)     : gen_row (i+1) row
    | i == length row - 1 = is_trap (row!!(i-1)) (row!!i) False        : gen_row (i+1) row
    | otherwise           = is_trap (row!!(i-1)) (row!!i) (row!!(i+1)) : gen_row (i+1) row

main :: IO ()
main = print [first, second]
  where first  = sum . map ( length . filter (==False) ) . take 40     $ iterate (gen_row 0) input
        second = sum . map ( length . filter (==False) ) . take 400000 $ iterate (gen_row 0) input
        input  = map (=='^') "^^.^..^.....^..^..^^...^^.^....^^^.^.^^....^.^^^...^^^^.^^^^.^..^^^^.^^.^.^.^.^.^^...^^..^^^..^.^^^^"

