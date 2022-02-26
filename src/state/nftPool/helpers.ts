import { FETCH_NFT_INFO_DEVELOPMENT_DATA, GET_COLLECTION_API_PRODUCTION_DATA, GET_COLLECTIONS_API_PRODUCTION_DATA } from '../../config/rep'
import { NftInfo } from './types'

export const fetchNftInfo = async (): Promise<NftInfo[]> => {
  try {
    const data = FETCH_NFT_INFO_DEVELOPMENT_DATA.data.data.map((item: any) => {
      return {
        ...item,
        image: JSON.parse(item?.metadataJSON),
      }
    })
    if (data.length > 0) {
      localStorage.setItem('NFT_LOCAL_DB_V1', JSON.stringify(data))
    }
    return data
    // }
    return []
  } catch (error) {
    return []
  }
}
