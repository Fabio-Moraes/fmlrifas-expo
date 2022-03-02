import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
} from 'react';

type listDataType = {
    firstCard: number;
    id: string;
};


interface ConvertListReturn {
    [key: string]: [{
        id: number;
        name: string;
        phone: string;
        status: string;
        dealer: string;
        coupon: string
        price: number;
        data_time: string;
    }]
};


interface ResponceArrayType {
    id: number;
    number: number;
    name: string;
    phone: string;
    status: string;
    dealer: string;
    coupon: string
    price: number;
    data_time: string;
};

type StateContext = {
    listData: listDataType[];
    setlistData: (value: listDataType[]) => void;

    loading: boolean;
    setLoading: (value: boolean) => void;

    perPage: number;
    setPerPage: (value: number) => void;

    getList: ConvertListReturn;
    setGetList: (value: ConvertListReturn) => void;

    isMountedApi: boolean;
    setIsMountedApi: (value: boolean) => void;

    keyboardActive: boolean;
    setKeyboardActive: (value: boolean) => void;

    shoppingCartItem: number[] | [];
    setShoppingCartItem: (value: number[] | []) => void;

    selectedNumber: number | null;
    setSelectedNumber: (value: number | null) => void;

    shoppingCartActive: boolean;
    setShoppingCartActive: (value: boolean) => void;

    paymentMenuActive: boolean;
    setPaymentMenuActive: (value: boolean) => void;

    loginMenuActive: boolean;
    setLoginMenuActive: (value: boolean) => void;

    hamburgerMenuActive: boolean;
    setHamburgerMenuActive: (value: boolean) => void;

    registerMenuActive: boolean;
    setRegisterMenuActive: (value: boolean) => void;

    immediatePurchase: boolean;
    setImmediatePurchase: (value: boolean) => void;

    alertActive: boolean;
    setAlertActive: (value: boolean) => void;

    alertMessage: string | JSX.Element;
    setAlertMessage: (value: string | JSX.Element) => void;

    loginValue: { name: string, password: string, permission: string };
    setLoginValue: (value: { name: string, password: string, permission: string }) => void;

    countAnalyzed: { paid: number, analyzed: number };
    setCountAnalyzed: (value: { paid: number, analyzed: number }) => void;

    responceArray: ResponceArrayType[];
    setResponceArray: (value: ResponceArrayType[] | []) => void;

    sortNumber: string;
    setSortNumber: (value: string) => void;

    nextPage: boolean;
    setNextPage: (value: boolean) => void;

    rewindPage: boolean;
    setRewindPage: (value: boolean) => void;

    autoScroll: boolean;
    setAutoScroll: (value: boolean) => void;

    textFilterNumber: string;
    setTextFilterNumber: (value: string) => void;

    searchValue: number | undefined;
    setSearchValue: (value: number | undefined) => void;
};

type ProviderProps = {
    children: ReactNode;
};

export const Context = createContext({} as StateContext);

const Provider = ({ children }: ProviderProps) => {
    const [listData, setlistData] = useState<listDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(504);
    const [getList, setGetList] = useState({});
    const [isMountedApi, setIsMountedApi] = useState(false);
    const [keyboardActive, setKeyboardActive] = useState(false);
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const [paymentMenuActive, setPaymentMenuActive] = useState(false);
    const [loginMenuActive, setLoginMenuActive] = useState(false);
    const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [registerMenuActive, setRegisterMenuActive] = useState(false);
    const [immediatePurchase, setImmediatePurchase] = useState(false);
    const [alertActive, setAlertActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loginValue, setLoginValue] = useState({ name: '', password: '', permission: '' });
    const [countAnalyzed, setCountAnalyzed] = useState({ paid: 0, analyzed: 0 });
    const [responceArray, setResponceArray] = useState([]);
    const [sortNumber, setSortNumber] = useState('default');
    const [nextPage, setNextPage] = useState(false);
    const [rewindPage, setRewindPage] = useState(false);
    const [textFilterNumber, setTextFilterNumber] = useState('Número não encontrado');
    const [autoScroll, setAutoScroll] = useState(false);
    const [searchValue, setSearchValue] = useState();
    return (
        <Context.Provider value={{
            listData,
            setlistData,

            loading,
            setLoading,

            perPage,
            setPerPage,

            getList,
            setGetList,

            isMountedApi,
            setIsMountedApi,

            keyboardActive,
            setKeyboardActive,

            shoppingCartActive,
            setShoppingCartActive,

            shoppingCartItem,
            setShoppingCartItem,

            selectedNumber,
            setSelectedNumber,

            paymentMenuActive,
            setPaymentMenuActive,

            hamburgerMenuActive,
            setHamburgerMenuActive,

            alertActive,
            setAlertActive,

            registerMenuActive,
            setRegisterMenuActive,

            loginMenuActive,
            setLoginMenuActive,

            alertMessage,
            setAlertMessage,

            immediatePurchase,
            setImmediatePurchase,

            loginValue,
            setLoginValue,

            countAnalyzed,
            setCountAnalyzed,

            responceArray,
            setResponceArray,

            sortNumber,
            setSortNumber,

            nextPage,
            setNextPage,

            rewindPage,
            setRewindPage,

            textFilterNumber,
            setTextFilterNumber,

            autoScroll,
            setAutoScroll,

            searchValue,
            setSearchValue

        } as StateContext}>
            {children}
        </Context.Provider>
    );
};

function useContexState() {
    const context = useContext(Context);
    return context;
};

export {
    Provider,
    useContexState
};