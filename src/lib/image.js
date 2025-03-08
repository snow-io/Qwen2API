const axios = require('axios')
const FormData = require('form-data')
const uuid = require('uuid')
const { sleep } = require('./tools')

async function uploadImage(base64Data, authToken) {
  // 将base64数据转换为Buffer
  const base64Image = base64Data.split(';base64,').pop()
  const imageBuffer = Buffer.from(base64Image, 'base64')

  // 创建FormData对象
  const formData = new FormData()
  formData.append('file', imageBuffer, {
    filename: uuid.v4(),
    contentType: 'image'
  })

  try {
    // 发送请求
    const response = await axios.post('https://chat.qwen.ai/api/v1/files/', formData, {
      headers: {
        ...formData.getHeaders(),
        "Host": "chat.qwen.ai",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "x-request-id": "647cb70a-cba5-4c36-b2b6-24ffd1cd9ddd",
        "authorization": authToken,
        "bx-umidtoken": "T2gANtcYZT9YXfuoIZSNG3a6XIXekUQTnHdkm89EvfK4PlAHce3PTY7P2uXFuSyOUD0=",
        "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
        "bx-ua": "231!HfE3n4mU6XD+joD+2A3qn9GjUq/YvqY2leOxacSC80vTPuB9lMZY9mRWFzrwLEkXiDXjNoMrUTUrD8F60zRopdw4q1VCXXb6a3OcTO0aNraYN7OvMJaMSPZflmanlUyoCu/53Ob3Z2axxzeocMRAZBbLWmN5pACia0pqOo32MEW8R00WUQ8Eh/x/9FF9Wsw51YBfIx0BNoJOn3iv7H4JNd4Pn7Fc3kjC0Q3oyE+jlN0WmBO0lGIGHkE+++3+qCS4+ItM2+6yoj2Co+4oHoHrYllvGajKNtZP0VnAemzey5L2aDafscJnytDA0CU9Lr2fBdtUJ05wM85zMV1K82dLiIIwrx7R2j2RhroyQJVkNGvMrbggEB9jwafW9HB4ZSUHvT2o3dfd2ttMeoYcE8eRZaEfwAJaPh4OQH9JOxqVSs4hkFD9V2/l3lDylss7J9hBsENAc8XpkC3H42Vd7Bd3nOh6i2804/kS4sOVefHFQr6uuAKNEN0VgW1lTVHPx6J+v6EsUX5Pia1jhfxu7hrX9M13Xx66nvCmYVqhPLC3khh8T/9iSqWL2Hz923Ah1dYM86HVfctlWbq+Gpz150IcktLUpfZOh+rmO26G34RyjOzKiaqroI0G7TVSS0wRNpTYwwSRhx4XLlTCovLEAeKV9FOdRg7PmqId30ad0Q6pa05uGljSAhW0nhfhQ3hUX7xWM08rUkZdFY77emjkWOMgKoPJ9MGcpbSsosUgT8nY0UDNgJrKZukRbMsmHGcwPfxhlnhTBb792FAmGwIFVauUINI8Rs6iJpp2pOMOTkKFIVp3jtPuSrdXskdpCUAcuVHttIHQlQe4ZBkQwxOd6KTNla89AkF8imVObsEwS2jnygnPJxYFh+XJ5q9p5HsvCf/6lxFzc+x+JLRfEE7vshRemUjRAf58jfCxArX7K2WZtIUrvgW6b6lGYgJmDfpSnNNIzEoixI7SQtdYo0oF49r5yMTeF6Z9X8Tv9a8tGPnc73lcaITtouRfkBiWRJdCg9I8ycMDqJbwUkMjMpF/+c+A0o/inaz4ehRlTxI0upr/OtzdbVkwWcFYbmJuDrZLTlt+MsyE2KmNfVjNccAw4f5OWcjLtKGjX3FUvxpfCobuYKqcOP1q8ku5xQrEQgDXxBSrckylc4qGlzD0b+ykDbkQHec99V6stxgWsT2yGM04ODEqomDk+CkRcKKXzjET5DPA0kJ2j0+XErTyYwP3uwhbNtjcXmo/dCCSC7t1HRp9E+/o0fDMtv2is6aIMBFO4Pq5K5MQ0ESl2Q1/lrQseYqgQbQpKLAaKhmldVJFGCMOlH82qXOnwgQ8RlUlwAbVAYansCMgyrNQASS3Wdj+mjPRjubbT436s5UT2/Tv4+9IaI2fwE1BAGlw2ip8YXZsgfkDI1R7XZpSxiUWx85zfbbcMdqXyOyPM68k4rVksmS5eDb2e2ZJEesRRDo3KLLnGanGlYkMFMpAuBVx",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "bx-v": "2.5.28",
        "origin": "https://chat.qwen.ai",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://chat.qwen.ai/",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": `_gcl_au=1.1.828597960.1740456102;cna=qS5EIEcjlH0BASQOBGAZfs5p;acw_tc=13b5be1680f7cde2106f40ee928d097af327aba086a9228880897a73ecb3aafb;token=${authToken};xlly_s=1;ssxmod_itna=mqUxRDBDnD00I4eKYIxAK0QD2W3nDAQDRDl4Bti=GgexFqAPqDHIa3vY8i0W0DjObNem07GneDl=24oDSxD6HDK4GTmzgh2rse77ObPpKYQ7R2xK7Amx4cTilPo+gY=GEUPn3rMI6FwDCPDExGkPrmrDeeaDCeDQxirDD4DADibe4D1GDDkD0+m7UovW4GWDm+mDWPDYxDrbRYDRPxD0ZmGDQI3aRDDBgGqob0CESfGR4bUO+hLGooD9E4DsO2nQYO6Wk=qGS8uG13bQ40kmq0OC4bAeILQa38vvb4ecEDoV=mxYamN10DOK0ZIGNjGN0DK02kt+4j0xRG4lhrQwFfYoDDWmAq8es8mGmACAT1ju1m7YTi=eDofhpY847DtKYxIO+gG=lDqeDpFidgOD/MhKhx4D;ssxmod_itna2=mqUxRDBDnD00I4eKYIxAK0QD2W3nDAQDRDl4Bti=GgexFqAPqDHIa3vY8i0W0DjObNem07GeDAYg25EoK0Gx03K+UeDsXWBk3hA77G1R5XFltYQ0EqlfYj5XW2iYjxf3l4tdco06thrWXGiW+cFHXQrO7QxF/CydRcHQsPA4LxPFc=AxoKpPD1F1bEPz/O283eHkOiYG/7DFLZbOozFFbZbH/BwaKjcF7Sn1r/psVBEWv9MP69pCFgqGiScCq/406p8WDwrXDtjP7hDaYUP4updgT0HrO/Y0god6QnKGD8DqhqYsqGDwYtP9Yt4oPQhAZDYqbPD=DzhYE26QPARiDKo6BGGzaoXn6dKPemrM2PKZYfAQ/DiN7PE2vV0DbiDGQmVepx7GUBhxPT2B5/1ufDRN4d8/hM7E6emvnuNtDwRjdi4blREb4wGq10qgl5dicH8eQnexD;SERVERID=0a3251b1bff13a18b856bcf1852f8829|1740834371|1740834361;SERVERCORSID=0a3251b1bff13a18b856bcf1852f8829|1740834371|1740834361;tfstk=gPzmGd62kooXVyepH8ufvlDQWTIRGIgsxRLtBVHN4Yk7kRIjBu0aTJmtbiZYEIauKFLAhiNwSV3Np9QdJSNo5VWp4f9awKGjiF7tQn-rlfUww0dFJSNXauNajS_pIvg355kaQmor4jHrgno4Q4RrMY8q_ElwU_csUVlq0m-zafh6gfkaQ75o1YkZ7Vl09Fk37zaPUrRE4Yhm4zcmmvPlAF8MojJKpSkJ7FkmimqYgYYw7zqRLJ-s3MO-CqHbZj21REgqjlzxzrWP72rQEPmE-GCj05quCqUP_nkUD-3zukAw77000caZxKXoLrNzR4oR86VzP-Fbr5dN7beKUSaqSw5IoqkqrbaOFEkg4lzxcV9VIAauarrG4RtyYw1y53D94hts0bGopKGwPsvDzz35Z_xCcmlSM9ClZhOq0bGIJ_fkYeoqNjel.;isg=BPz8BdNVt0zUyoPuxsZIFaJNzZqu9aAfdEJYtdZ9jOfKoZ4r_gYOroLXhcnZ6dh3`,
        "priority": "u=1, i"
      }
    })
    return response.data.id

  } catch (error) {
    console.log(error)
    return false
  }
}

async function createImageRequest(prompt, model = 'qwen-max-latest', size = '1024*1024', authToken) {

  const sizeMap = [
    '1024*1024',
    '768*1024',
    '1024*768',
    '1280*720',
    '720*1280'
  ]

  if (!sizeMap.includes(size)) {
    size = '1024*1024'
  }

  model = model.replace('-draw', '').replace('-thinking', '').replace('-search', '')

  try {
    const response = await axios.post('https://chat.qwen.ai/api/chat/completions', {
      "stream": false,
      "incremental_output": true,
      "chat_type": "t2i",
      "model": model,
      "messages": [
        {
          "role": "user",
          "content": prompt,
          "chat_type": "t2i",
          "extra": {},
          "feature_config": {
            "thinking_enabled": false
          }
        }
      ],
      "id": uuid.v4(),
      "size": size
    }, {
      headers: {
        "Host": "chat.qwen.ai",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        "x-request-id": "647cb70a-cba5-4c36-b2b6-24ffd1cd9ddd",
        "authorization": authToken,
        "bx-umidtoken": "T2gANtcYZT9YXfuoIZSNG3a6XIXekUQTnHdkm89EvfK4PlAHce3PTY7P2uXFuSyOUD0=",
        "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
        "bx-ua": "231!HfE3n4mU6XD+joD+2A3qn9GjUq/YvqY2leOxacSC80vTPuB9lMZY9mRWFzrwLEkXiDXjNoMrUTUrD8F60zRopdw4q1VCXXb6a3OcTO0aNraYN7OvMJaMSPZflmanlUyoCu/53Ob3Z2axxzeocMRAZBbLWmN5pACia0pqOo32MEW8R00WUQ8Eh/x/9FF9Wsw51YBfIx0BNoJOn3iv7H4JNd4Pn7Fc3kjC0Q3oyE+jlN0WmBO0lGIGHkE+++3+qCS4+ItM2+6yoj2Co+4oHoHrYllvGajKNtZP0VnAemzey5L2aDafscJnytDA0CU9Lr2fBdtUJ05wM85zMV1K82dLiIIwrx7R2j2RhroyQJVkNGvMrbggEB9jwafW9HB4ZSUHvT2o3dfd2ttMeoYcE8eRZaEfwAJaPh4OQH9JOxqVSs4hkFD9V2/l3lDylss7J9hBsENAc8XpkC3H42Vd7Bd3nOh6i2804/kS4sOVefHFQr6uuAKNEN0VgW1lTVHPx6J+v6EsUX5Pia1jhfxu7hrX9M13Xx66nvCmYVqhPLC3khh8T/9iSqWL2Hz923Ah1dYM86HVfctlWbq+Gpz150IcktLUpfZOh+rmO26G34RyjOzKiaqroI0G7TVSS0wRNpTYwwSRhx4XLlTCovLEAeKV9FOdRg7PmqId30ad0Q6pa05uGljSAhW0nhfhQ3hUX7xWM08rUkZdFY77emjkWOMgKoPJ9MGcpbSsosUgT8nY0UDNgJrKZukRbMsmHGcwPfxhlnhTBb792FAmGwIFVauUINI8Rs6iJpp2pOMOTkKFIVp3jtPuSrdXskdpCUAcuVHttIHQlQe4ZBkQwxOd6KTNla89AkF8imVObsEwS2jnygnPJxYFh+XJ5q9p5HsvCf/6lxFzc+x+JLRfEE7vshRemUjRAf58jfCxArX7K2WZtIUrvgW6b6lGYgJmDfpSnNNIzEoixI7SQtdYo0oF49r5yMTeF6Z9X8Tv9a8tGPnc73lcaITtouRfkBiWRJdCg9I8ycMDqJbwUkMjMpF/+c+A0o/inaz4ehRlTxI0upr/OtzdbVkwWcFYbmJuDrZLTlt+MsyE2KmNfVjNccAw4f5OWcjLtKGjX3FUvxpfCobuYKqcOP1q8ku5xQrEQgDXxBSrckylc4qGlzD0b+ykDbkQHec99V6stxgWsT2yGM04ODEqomDk+CkRcKKXzjET5DPA0kJ2j0+XErTyYwP3uwhbNtjcXmo/dCCSC7t1HRp9E+/o0fDMtv2is6aIMBFO4Pq5K5MQ0ESl2Q1/lrQseYqgQbQpKLAaKhmldVJFGCMOlH82qXOnwgQ8RlUlwAbVAYansCMgyrNQASS3Wdj+mjPRjubbT436s5UT2/Tv4+9IaI2fwE1BAGlw2ip8YXZsgfkDI1R7XZpSxiUWx85zfbbcMdqXyOyPM68k4rVksmS5eDb2e2ZJEesRRDo3KLLnGanGlYkMFMpAuBVx",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "bx-v": "2.5.28",
        "origin": "https://chat.qwen.ai",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://chat.qwen.ai/",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": `_gcl_au=1.1.828597960.1740456102;cna=qS5EIEcjlH0BASQOBGAZfs5p;acw_tc=13b5be1680f7cde2106f40ee928d097af327aba086a9228880897a73ecb3aafb;token=${authToken};xlly_s=1;ssxmod_itna=mqUxRDBDnD00I4eKYIxAK0QD2W3nDAQDRDl4Bti=GgexFqAPqDHIa3vY8i0W0DjObNem07GneDl=24oDSxD6HDK4GTmzgh2rse77ObPpKYQ7R2xK7Amx4cTilPo+gY=GEUPn3rMI6FwDCPDExGkPrmrDeeaDCeDQxirDD4DADibe4D1GDDkD0+m7UovW4GWDm+mDWPDYxDrbRYDRPxD0ZmGDQI3aRDDBgGqob0CESfGR4bUO+hLGooD9E4DsO2nQYO6Wk=qGS8uG13bQ40kmq0OC4bAeILQa38vvb4ecEDoV=mxYamN10DOK0ZIGNjGN0DK02kt+4j0xRG4lhrQwFfYoDDWmAq8es8mGmACAT1ju1m7YTi=eDofhpY847DtKYxIO+gG=lDqeDpFidgOD/MhKhx4D;ssxmod_itna2=mqUxRDBDnD00I4eKYIxAK0QD2W3nDAQDRDl4Bti=GgexFqAPqDHIa3vY8i0W0DjObNem07GeDAYg25EoK0Gx03K+UeDsXWBk3hA77G1R5XFltYQ0EqlfYj5XW2iYjxf3l4tdco06thrWXGiW+cFHXQrO7QxF/CydRcHQsPA4LxPFc=AxoKpPD1F1bEPz/O283eHkOiYG/7DFLZbOozFFbZbH/BwaKjcF7Sn1r/psVBEWv9MP69pCFgqGiScCq/406p8WDwrXDtjP7hDaYUP4updgT0HrO/Y0god6QnKGD8DqhqYsqGDwYtP9Yt4oPQhAZDYqbPD=DzhYE26QPARiDKo6BGGzaoXn6dKPemrM2PKZYfAQ/DiN7PE2vV0DbiDGQmVepx7GUBhxPT2B5/1ufDRN4d8/hM7E6emvnuNtDwRjdi4blREb4wGq10qgl5dicH8eQnexD;SERVERID=0a3251b1bff13a18b856bcf1852f8829|1740834371|1740834361;SERVERCORSID=0a3251b1bff13a18b856bcf1852f8829|1740834371|1740834361;tfstk=gPzmGd62kooXVyepH8ufvlDQWTIRGIgsxRLtBVHN4Yk7kRIjBu0aTJmtbiZYEIauKFLAhiNwSV3Np9QdJSNo5VWp4f9awKGjiF7tQn-rlfUww0dFJSNXauNajS_pIvg355kaQmor4jHrgno4Q4RrMY8q_ElwU_csUVlq0m-zafh6gfkaQ75o1YkZ7Vl09Fk37zaPUrRE4Yhm4zcmmvPlAF8MojJKpSkJ7FkmimqYgYYw7zqRLJ-s3MO-CqHbZj21REgqjlzxzrWP72rQEPmE-GCj05quCqUP_nkUD-3zukAw77000caZxKXoLrNzR4oR86VzP-Fbr5dN7beKUSaqSw5IoqkqrbaOFEkg4lzxcV9VIAauarrG4RtyYw1y53D94hts0bGopKGwPsvDzz35Z_xCcmlSM9ClZhOq0bGIJ_fkYeoqNjel.;isg=BPz8BdNVt0zUyoPuxsZIFaJNzZqu9aAfdEJYtdZ9jOfKoZ4r_gYOroLXhcnZ6dh3`,
        "priority": "u=1, i"
      },
    })

    return {
      status: 200,
      task_id: response.data.messages.find(item => item.role === 'assistant').extra.wanx.task_id
    }

  } catch (error) {
    console.log(error)
    return {
      status: 500,
      task_id: null
    }
  }

}

async function awaitImage(task_id, authorization) {

  for (let i = 0; i < 30; i++) {
    try {
      const response = await axios.get(`https://chat.qwen.ai/api/v1/tasks/status/${task_id}`, {
        headers: {
          'authorization': `Bearer ${authorization}`
        }
      })
      if (response.data.content !== '') {
        // console.log(`等待图片生成完成...`)
        return {
          status: 200,
          url: response.data.content
        }
      }
    } catch (error) {
      continue
    }
    // console.log(`等待次数: ${i + 1}`)
    await sleep(6000)
  }

  return {
    status: 500,
    url: null
  }
}

module.exports = {
  uploadImage,
  createImageRequest,
  awaitImage
}
