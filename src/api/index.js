import { post, get } from '../utils/request';
import qs from 'qs'

export const dailyCountApi = t => {
    return get('game/game_over', {
        params: {
            t: t,
            rank_score: 1,
            rank_state: 1,
            rank_time: 20,
            rank_role: 1,
            skin: 1,
        }
    });
};
export const topicApi = t => {
    return get('game/topic_game_over', {
        params: {
            t: t,
            rank_score: 1,
            rank_state: 1,
            rank_time: 20,
            rank_role: 1,
            skin: 1,
        }
    });
};
export const getWxOpenId = uid => {
    return get('game/user_info', {
        params: {
            uid: uid,
            t: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMTIxMzUsIm5iZiI6MTY2MzIwOTkzNSwiaWF0IjoxNjYzMjA4MTM1LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjoxMzIwNDM5NiwiZGVidWciOiIiLCJsYW5nIjoiIn0.VxvTLcrZjtdNFxvb_MivZlLLrrar3Ojl8Kh8gCG-u3I'
        }
    });
}
export const getTokenApi = wxOpenId => {
    return post('user/login_oppo', qs.stringify({
        'avatar': 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJMW3f6jeDLDeqvHJic0SXV7bEdUx1s9Yl1T4dNRJiahhfJxv2rf6v6gYIculEWJbtljIBxxib3Eia5sg/132',
        'nick_name': '124',
        'sex': '1',
        'uid': wxOpenId
    }));
}
