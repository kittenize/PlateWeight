# PlateWeight
Getting the optimal plate sets

Problem

Sometimes while weight lifting, we have to change weights between sets. 

Given n sets with target weights and x plates, what is the optimal way to load the plates to reduce actions? 

Actions compose of either taking off a plate or adding on a plate. 

For example:
The bar weighs 45lb.
I have 2 sets to lift: 65lb and 55lb
I have sets of 10s and 5s.

The possible combinations for 65lb is
1. 1 10lb
2. 2  5lb

The possible combinations for 55lb is
1. 1 5lb

From this, it would be optimal to load it like so:
Set 1 | 65lb | 2 5lbs
Set 2 | 55lb | 1 5lbs

Because this means I would only have to take off 1 5lb between set 1 and 2 ( 1 action)
If I were to do 1 10lb for set 1, then I woul dhave to take off 1 10lb and put on 1 lb (2 actions)

