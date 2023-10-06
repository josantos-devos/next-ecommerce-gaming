import { ENV } from "@/utils";
import { authFetch } from "@/utils/authFetch";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filers[user][id][$eq]=${userId}`;
      const sort = "sort[0]=createdAt:desc";
      const urlParams = `${filters}&${sort}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${urlParams}`;

      const response = await authFetch(url);
      const results = await response.json();

      if (response.status !== 200) throw results;

      return results;
    } catch (error) {
      throw error;
    }
  }
}
