import duration from 'pendel';

/**
 *
 * @param createdOn string as Date
 * @returns updatedDate as localDateString
 */

export const compareMinutes = (createdOn: string) => {
  /** Compare The Dates */
  if (new Date().toLocaleDateString('en-gb') == new Date(createdOn).toLocaleDateString('en-gb')) {
    /** Compare The Time */
    const difference = duration.time(
      new Date().toLocaleTimeString('en-gb'),
      new Date(createdOn).toLocaleTimeString('en-gb')
    );

    return difference.minutes > 5 ? false : true;
  }
  return false;
};
