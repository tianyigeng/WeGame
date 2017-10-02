# Util functions for data ingestion.

import random

FIRST_NAMES = [
  'John',
  'Stephane',
  'Olivia',
  'Jacky',
  'Tim',
  'Michael',
  'Dana',
  'Sundar',
  'Ben'
]

LAST_NAMES = [
  'Smith',
  'Gomes',
  'Jordan',
  'Hinton',
  'Ballbach',
  'Wolosin',
  'Wang',
  'Lee',
  'Zhang'
]

# Returns a random name using user_id as seed.
def GetRandomNameFromUserId(uid):
  random.seed(uid)
  return ' '.join([random.choice(FIRST_NAMES), random.choice(LAST_NAMES)])
