// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { uid } from 'uid';
import _, { isEmpty } from 'lodash';
import { Encryptor } from '@helpers/EncryptUID';
import { encodeBase64 } from 'bcryptjs';
import { supabase } from '@utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { telegramId } = body;

  switch (method) {
    case 'POST':
      try {
        /** Check If User Exist In Database */
        const { data: userData } = await supabase.from('Users').select().eq('telegramId', telegramId);

        /** Only If User Exist */
        if (!_.isEmpty(userData)) {
          const randomId = `UNIQUE-${uid().toUpperCase()}`;
          /** Send Unique_ID */
          const message = encodeURIComponent(
            `▬▬▬▬▬ 𝙐𝙄𝘿_𝙑𝙀𝙍𝙄𝙁𝙄𝘾𝘼𝙏𝙄𝙊𝙉 ✞ ▬▬▬▬▬\n\n <u>𝘾𝙃𝘼𝙏_𝙄𝘿</u> => <b>${telegramId}</b>\n <u>𝙐𝙉𝙄𝙌𝙐𝙀_𝙄𝘿</u> => <code>${randomId}</code>`
          );

          const sendMessage = await fetch(
            `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_KEY}/sendMessage?chat_id=${telegramId}&parse_mode=html&text=${message}`,
            {
              method: 'GET',
            }
          );

          const { ok } = await sendMessage.json();

          /** Persist Session */
          /** Check If Session Already Registered */
          const { data: userSession } = await supabase.from('UserSession').select().eq('telegramId', telegramId);

          /** If No Row In UserSession Then Create New One */
          if (isEmpty(userSession)) {
            const { data: createNewSession } = await supabase.from('UserSession').insert([
              {
                telegramId,
                encryptedToken: await Encryptor(randomId),
                createdOn: new Date(),
              },
            ]);
          } else {
            const { data: updateSession } = await supabase
              .from('UserSession')
              .update({ encryptedToken: await Encryptor(randomId), createdOn: new Date() })
              .match({ telegramId });
          }

          /** If There Is Row In UserSession Then Update That Row */

          /** Send Success Response */
          return res.status(200).json({
            success: ok,
            response: ok
              ? "UniqueID Successfully Sent To User's Telegram."
              : 'Either Bot Is Blocked Or TelegramID Not Associated To Any Chat_ID.',
          });
        }

        /** Send Unsuccessful Response */
        return res.status(400).json({ success: false, response: 'User Is Not Currently Registered.' });
      } catch (error) {
        /** Throw Server Error If Any Occur */
        res.status(500).json({ success: false, response: 'Internal Server Error', error });
      }
  }
}
