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
  'Ben',
  'Jack',
  'Thomas',
  'Joshua',
  'Daniel',
  'Matthew',
  'James',
  'Joseph',
  'Harry',
  'Leo',
  'AMELIA',
  'OLIVIA',
  'EMILY',
  'AVA',
  'ISLA',
  'JESSICA',
  'POPPY',
  'ISABELLA',
  'SOPHIE',
  'MIA',
  'RUBY',
  'LILY',
  'GRACE',
  'EVIE',
  'SOPHIA',
  'ELLA'

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
  'Zhang',
  'Jones',
  'William',
  'Jhonson',
  'Brown',
  'Jackson',
  'Thompson',
  'Cook',
  'Barnes',
  'Perry',
  'Scott',
  'Robinson',
  'Garcia',
  'Phillips',
  'Lewis',

]

# Returns a random name using user_id as seed.
def GetRandomNameFromUserId(uid):
  random.seed(uid)
  return '_'.join([random.choice(FIRST_NAMES), random.choice(LAST_NAMES)])
