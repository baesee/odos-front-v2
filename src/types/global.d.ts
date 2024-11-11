interface Window {
    gtag: (
        command: string,
        eventName: string,
        eventParameters: {
            [key: string]: string | number;
        }
    ) => void;
}
