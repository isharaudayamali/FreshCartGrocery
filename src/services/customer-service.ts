import { axiosClient } from "../configs/api-config";
import type { Page } from "../models/common-models";
import type CustomerDataModel from "../models/customer-data-model";
import type { CustomerDetailsModel } from "../models/customer-details-model";
import type CustomerInsertModel from "../models/customer-insert-model";

    const endpoint = "/customer";
    const insertEndpoint = endpoint; ;

export async function insertCustomer(customer: CustomerInsertModel): Promise<CustomerDataModel> {

        const response = await axiosClient.post(insertEndpoint, {
            data: customer,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.data;

        if (response.status === 201) {
            return resData as CustomerDataModel;
        } else {
            throw new Error(resData.message || `Backend error: ${response.status}`);
        }
    }

export async function getCustomersData(page: number, pageSize: number, name: string, mobile: string, NIC: string): Promise<Page<CustomerDataModel>> {

    const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        name: name,
        mobile: mobile,
        nic: NIC,
        sort: "id,desc"
    });

    const response = await axiosClient.get(`${endpoint}?${params.toString()}`);

    if (response.status === 200) {
        return await response.data as Page<CustomerDataModel>;
    } else {
        const errorData = await response.data;
        throw new Error(errorData.message || `Failed to fetch customers: ${response.status}`);
    }
}


export async function deleteCustomerData(id:number):Promise<boolean> {
  const response = await axiosClient.delete(endpoint + "/" + id, {
    
    headers: {
      'Content-Type': 'application/json'
    }
  });
  

  if (response.status === 200) {
    return true;
  } else {
    throw new Error(response.data.message || `Failed to delete customer: ${response.status}`);
  }
}

export async function getCustomerDetail(id: number): Promise<CustomerDetailsModel> {
    const response = await axiosClient.get<CustomerDetailsModel>(`${endpoint}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        return await response.data as CustomerDetailsModel;
    } else {
    
        throw new Error(`Failed to fetch customer details: ${response.status}`);
    }
}

export async function updateCustomer(id: number, customer: CustomerInsertModel): Promise<CustomerDataModel> {
    const response = await axiosClient.put<CustomerDataModel>(`${endpoint}/${id}`, {
        body: JSON.stringify(customer),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        return await response.data as CustomerDataModel;
    } else {
        throw new Error( `Failed to update customer: ${response.status}`);
    }
}