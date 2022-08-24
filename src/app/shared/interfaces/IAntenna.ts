export interface IAntenna {
    _id: string | null;
    ssid_sectorial: string;
    mac_sectorial: string;
    mode_operation: string;
    point_to_point: boolean;
    name_device: string;
    mac_device: string;
    channel: number;
    frequency: number;
    country: string;
    potency: number;
    wireless_security: string;
    antena_type: string;
    device_version: string;
    device_user: string;
    device_password: string;
    device_ip: string;
    device_location: string;
    device_status: boolean;
}

export interface IFilterAntenna {
    mode_operation: undefined | string;
    device_ip: undefined | string;
    name_device: undefined | string;
    ssid_sectorial: undefined | string;
}