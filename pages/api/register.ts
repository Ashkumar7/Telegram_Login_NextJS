import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import { supabase } from '@utils/supabaseClient';

interface User {
  fullName: String;
  email: String;
  telegramId: Number;
  createdAt: String;
  role: 'USER' | 'ADMIN';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { fullName, email, telegramId } = body;

  switch (method) {
    case 'POST':
      try {
        /** Check If User Already Exist In Database */
        const { data: userData } = await supabase.from('Users').select().eq('telegramId', telegramId);

        /** If User Doesnt Exist */
        if (_.isEmpty(userData)) {
          /** Create New User */
          const { data: newUserData, error } = await supabase.from('Users').insert([
            {
              fullName,
              email,
              telegramId,
            },
          ]);

          /** Error When Data Is Empty or Not Unique */
          if (error) {
            throw 'Something Wrong With Data Provided. Please Check Again.';
          }

          /** Send Success Response */
          return res.status(200).json({ success: true, response: 'User Successfully Registered.' });
        }

        return res.status(400).json({ success: false, response: 'User Already Registered.' });
      } catch (error) {
        if (typeof error !== 'string') {
          res.status(505).json({ success: false, response: 'Internal Server Error' });
        }
        res.status(505).json({ success: false, response: error });
      }
  }
}
