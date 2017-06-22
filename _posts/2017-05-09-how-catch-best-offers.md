---
title: How to catch best offers
description: Probably if you ask this question to different people, you will get different answers.
categories:
  - engineering
image: /images/posts/score-search.jpg
---

## What is an offer?

Offers, offers, offers. 💥.

If everything is an offer, then nothing is an offer. Think about that.

Commonly, an offer is **an item with reduced price**, but the point is that you need to establish a **baseline**.

> **Example**: If you find a new sail of this year for *€350*, looks a really good price, but this is because you know how much a sail with the same characteristics normally costs. If the rest of the items with the same characteristics cost under *€350*, definitely your sail is not an offer!
{:.info}

## Establishing the baseline

To detect *real offers* in [our application](https://windtoday.co), first of all we group the items in **segments** based on three characteristics:

- **Category**: Each items of each *category* have different prices, so this is an expected first classification to avoid false positives.

- **Year**: The more recent the *year* is, the more expensive is the item.

- **Condition**: When an item is *new* it is more expensive than *used*. In addition, it complements the rest of characteristics perfectly: a new sail of the last year could have a similar price compared with a new sail of the current year.

Grouping the elements based on these properties, we can obtain the minimum, maximum and average *price* per each segment and score all the items inside the segment with a value *between 0 and 1*:

- If the item has a value **near to 1**, it means that the price of the item is near to the minimum *price* detected in the segment.
- If the item has a value **near to 0**, it means that the price of the item is near to the maximum *price* detected in the segment.

## Sorting results by score

Now that we have all items scored, we can sort the results based on this score.

We have divided the offers into four groups (<img src="/images/posts/legendary.png" style="display:inline; width: 20px"><img src="/images/posts/epic.png" style="display:inline; width: 20px"><img src="/images/posts/rare.png" style="display:inline; width: 20px"><img src="/images/posts/uncommon.png" style="display:inline; width: 20px">), depending on how good the offer is:

- <img src="/images/posts/legendary.png" style="display:inline; width: 20px"> **Legendary**: Better than **95%** of the segment.
- <img src="/images/posts/epic.png" style="display:inline; width: 20px"> **Epic**: Better than **80%** of the segment.
- <img src="/images/posts/rare.png" style="display:inline; width: 20px"> **Rare**: Better than **70%** of the segment.
- <img src="/images/posts/uncommon.png" style="display:inline; width: 20px"> **Uncommon**: Better than **50%** of the segment.

Also in the application we apply another complementary rule to sort the results: The date on which the item has been part of the search engine. The items fetched in the last 24H have a **NEW** badge next to the title.

## Keep offers up to date

Every time a new item is added in the search, we recalculate the score of each item to keep offers up to date. Here is how it looks like:

<figure>
  <img src="/images/posts/score-search.gif">
  <figcaption>Cathing real offers with prices normalized never was more easy 🎉</figcaption>
</figure>

You can continue applying filters to improve the search.
