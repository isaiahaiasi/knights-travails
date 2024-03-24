# Knight's Travails

[The Odin Project - Knight's Travails](https://www.theodinproject.com/lessons/javascript-knights-travails)

## The Problem

Given a [Knight](https://en.wikipedia.org/wiki/Knight_(chess)) on a chess board, find the shortest path it can take between two points.

## Solution

Use a [Breadth-First Search](https://en.wikipedia.org/wiki/Breadth-first_search) to traverse each possible path the knight can take until it finds the target point. Because we are searching breadth-first, we know the first time we see the target point will be the shortest path it could have been.

## Future Improvements

**Pruning Optimization** - A very simple optimization we could make is to ignore steps that go in the opposite direction of the target position.

**Improved Testing** - The placeholder "testing" approach is not sufficient, since it does not cover the multiple different valid paths. A more robust solution would be to validate the path length, and then check separately that the path is valid.
