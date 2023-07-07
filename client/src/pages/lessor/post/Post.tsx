import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import { Pie, PieChart, Cell } from "recharts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import {
    getAllRoomsAsync,
    getApartmentsAsync,
    getBillsAsync,
    getRoomsAsync,
} from "../lessorAction";
import { useSearchParams } from "react-router-dom";
import { RoomStatus } from "../models";
import HouseImage from "../../../assets/house.jpg";
import { cities, districts, wards } from "../../../utils/data";

const Post = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const {
        addRoomDialog,
        addContractDialog,
        addBillDialog,
        editRoomDialog,
        isOpenDialogConfirmDelete,
        roomListPage,
        apartmentListPage,
        selectedRoom,
    } = useAppSelector((state) => state.lessor);
    const soNha = apartmentListPage.items.length;
    const soPhong = roomListPage.items.length;
    const soPhongSapTrong = roomListPage.items.filter(
        (x) => x.status === RoomStatus.OutSoon
    ).length;
    const soPhongTrong = roomListPage.items.filter(
        (x) => x.status === RoomStatus.Available
    ).length;
    const data = [
        { name: "Số nhà", value: soNha },
        { name: "Số phòng", value: soPhong },
        {
            name: "Số phòng sắp trống",
            value: soPhongSapTrong,
        },
        {
            name: "Số phòng trống",
            value: soPhongTrong,
        },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBillsAsync());
        dispatch(getApartmentsAsync());
        dispatch(getAllRoomsAsync());
    }, [searchParams.get("apartmentId")]);

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Stack padding={"8px"} gap={2}>
            {Array.isArray(roomListPage.items)
                ? roomListPage.items.map((item) => {
                      const { name, acreage, cost, apartment } = item;
                      const { address, city_code, district_code, ward_code } =
                          apartment || {};
                      const addressArray = [
                          address,
                          wards.find((item) => item.ward_code === ward_code)
                              ?.label,
                          districts.find(
                              (item) => item.district_code === district_code
                          )?.label,
                          cities.find((item) => item.city_code === city_code)
                              ?.label,
                      ].filter((i) => !!i);
                      return (
                          <Card sx={{ display: "flex", maxWidth: 500 }}>
                              <CardMedia
                                  component="img"
                                  sx={{ width: 151 }}
                                  image={HouseImage}
                                  alt="Live from space album cover"
                              />
                              <Box
                                  sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                  }}
                              >
                                  <CardContent sx={{ flex: "1 0 auto" }}>
                                      <Typography component="div" variant="h5">
                                          {name}
                                      </Typography>
                                      <Typography
                                          variant="subtitle1"
                                          color="text.secondary"
                                          component="div"
                                      >
                                          {acreage}m2
                                      </Typography>
                                      <Typography
                                          variant="subtitle1"
                                          color="text.secondary"
                                          component="div"
                                      >
                                          {cost}đ/tháng
                                      </Typography>
                                      <Typography
                                          variant="subtitle1"
                                          color="text.secondary"
                                          component="div"
                                      >
                                          {addressArray.join(", ")}
                                      </Typography>
                                  </CardContent>
                              </Box>
                          </Card>
                      );
                  })
                : []}
        </Stack>
    );
};

export default Post;
