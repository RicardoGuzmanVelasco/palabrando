-- Cover foreign-key lookups used by ownership checks and deletes.
create index challenge_cards_challenge_owner_idx
  on public.challenge_cards (challenge_id, user_id);
create index challenge_cards_user_idx
  on public.challenge_cards (user_id);
create index challenge_cards_word_owner_idx
  on public.challenge_cards (word_card_id, user_id);

create index word_card_tags_card_owner_idx
  on public.word_card_tags (word_card_id, user_id);
create index word_card_tags_user_idx
  on public.word_card_tags (user_id);

create index word_cards_added_by_idx
  on public.word_cards (added_by);
