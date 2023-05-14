import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import imgCamp1 from "../../assets/images/campaign1.jpg";
import imgCamp2 from "../../assets/images/campaign2.jpg";

const Campaign = () => {
  const campaigns = [
    {
      id: 1,
      title: "Điều tốt nhất vẫn chưa đến 1",
      description:
        "Trong ý hiểu của mình, Tết bắt đầu từ lúc dọn nhà 😀 Mọi hoạt[...]",
      imageUrl: imgCamp1,
    },
    {
      id: 2,
      title: "Điều tốt nhất vẫn chưa đến 2",
      description:
        "Khi lên ý tưởng cho bộ ảnh truyền thống đón Tết mình hay nghĩ đến[...]",
      imageUrl: imgCamp2,
    },
    // Thêm các mục Campaign khác tại đây
  ];

  return (
    <Wrap justify="center" my={"16"}>
      {campaigns.map((campaign) => (
        <WrapItem key={campaign.id}>
          <Box
            w="280px"
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
          >
            <Flex direction="column" alignItems="center" mb={4}>
              <Image src={campaign.imageUrl} alt="Campaign Image" mb={4} />
              <Text fontSize="lg" my={2}>
                {campaign.title}
              </Text>
              <Text fontSize="sm" mb={4}>
                {campaign.description}
              </Text>
              {/* <Button colorScheme="blue">Buy Now</Button> */}
            </Flex>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Campaign;
