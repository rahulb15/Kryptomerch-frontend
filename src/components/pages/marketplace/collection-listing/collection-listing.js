import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import Background from "../../../../assets/creator-banner.png";
import CreatorImg from "../../../../assets/creator-img.png";
import { Header } from "../../../common-components/header/header";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import CollectionListingTab from "./collection-listing-tab";
import "./collection-listing.scss";
import { toast } from "react-toastify";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const CommunityMarketplace = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [filteredNft, setFilteredNft] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [baseValue, setBaseValue] = useState(0);
  const [totalNftPrice, setTotalNftPrice] = useState(0.0);
  const [ownerCount, setOwnerCount] = useState(0);
  const { isAuth } = useSelector((state) => state.loginStatus);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const { walletAddress } = useSelector((state) => state.walletStatus);
  //   const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("id");

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = () => {
    Axios.get(`/collection/user-collection-by-id2?id=${foo}`, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          console.log(response.data.data[0], "collection data");
          // setCollectionName(response.data.data[0].collectionName);
          setCollectionData(response.data.data[0]);
        }
      })
      .catch((error) => {
        //   setUserRegistered(false)
      });
  };

  useEffect(() => {
    getNft();
  }, [refresh]);

  const getNft = () => {
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        console.log("heyllo6", response.data.data);
        if (response.data.status == "success") {
          setBaseValue(response.data.baseNftPrice);
          setTotalNftPrice(response.data.totalNftPrice);
          setOwnerCount(response.data.uniqueOwner);
          let nftList = response.data.data;
          const search = window.location.search;
          const params = new URLSearchParams(search);
          let foo = params.get("id");

          let filteredNftList = nftList.filter(
            (data) => data.collectionId === foo
          );
          console.log("filteredddd2", filteredNftList);
          const list = filteredNftList.filter((item) => {
            if (item.onMarketplace == false) {
              return item;
            }
          });
          setFilteredNft(list);
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
          setFilteredNft([]);
          console.log("hello");
        }
      })
      .catch((error) => {
        setFilteredNft([]);
        //   setCollectionList([])
        //   setUserRegistered(false)
        console.log("error", error);
      });
  };

  console.log("collectionData", collectionData);
  console.log("collectionName", collectionName);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Copied to clipboard");
  };

  const shareCollection = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_URL}marketplace/collection-listing?id=${foo}&for=all`
    );
    toast.success("Copied to clipboard");
  }
  const shareToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };


  return (
    <div>
      {/* <MarketplaceHeader /> */}
      {isAuth ? <HeaderafterLogin /> : <Header />}
      <div
        className="creatorOuterBx"
        style={{ background: `url(${Background})` }}
      >
        <div className="container">
          <div className="creatorDetBx">
            <div className="creatorImg">
              <img src={collectionData?.collection_info[0]?.imageUrl} alt="" />
            </div>
            <div className="creatorDet">
              <div className="creatorNameOuter">
                <div className="creatorName">
                  {collectionData?.collection_info[0]?.collectionName}

                  <HiCheckCircle />
                </div>
                <div className="wishlist">
                  <span>
                    <EmailShareButton url={window.location.href}>
                      <EmailIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </EmailShareButton>
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <TwitterIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </WhatsappShareButton>
                    <TelegramShareButton url={window.location.href}>
                      <TelegramIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TelegramShareButton>
                    {/* <BsGlobe style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={()=>{window.open(window.location.href)}}/> */}
                    {/* <BsTwitter style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToTwitter}/> */}
                    {/* <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToInstagram}/> */}
                    {/* <span style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}> */}
                    {/* <InstapaperShareButton url={window.location.href}>
                                                <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}/>
                                            </InstapaperShareButton> */}

                    {/* </span> */}
                    {/* <FaDiscord style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToDiscord}/> */}
                  </span>
                  <button onClick={shareToClipboard}>
                    <BsFillShareFill />
                  </button>
                </div>
              </div>
              <div className="kryptoId">
                <div className="kryptoInn">
                  {walletAddress.slice(0, 10)}...{walletAddress.slice(-5)}&nbsp;
                  <MdOutlineContentCopy
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      copyToClipboard();
                    }}
                  />
                </div>
                <div className="kryptocreator">
                  Created By
                  <strong>{collectionData?.user_info[0]?.name}</strong>
                </div>
              </div>
              <div className="kryptoCont">
                The collection name here is a collection of 10,000 unique
                Collection NFTs— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "}
                <a href="">Show more</a>
              </div>
              <div className="items_qty">
                <div className="itemQtyBx">
                  <small>Items</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.collection_info[0]?.totalSupply}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Owners</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.totalNftUser}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Total Volume</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.totalNftPrice} KDA
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Floor Price</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.minNftPrice} KDA
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="creatortabOuter">
          <div className="container">
            <CollectionListingTab
              filteredNft={filteredNft}
              collectionData={collectionData}
              setRefresh={setRefresh}
              refresh={refresh}
              collectionName={collectionName}
            />
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default CommunityMarketplace;
