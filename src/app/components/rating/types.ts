export type Rating = number;
export type RatingNotSet = null;
export type EmitRating = NonNullable<Rating | RatingNotSet>;
