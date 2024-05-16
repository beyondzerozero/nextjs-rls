"use client";
import DateFormatter from "@/components/date";
import { Database } from "@/types/supabasetype";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

/**
 * 로그인후 프로필 페이지
 */
const MyPage = () => {
  const supabase = createClientComponentClient();
  const [info, setInfo] = useState<
    Database["public"]["Tables"]["memberinfo"]["Row"][]
  >([]);
  useEffect(() => {
    async function getData() {
      const { data: info, error } = await supabase
        .from("memberinfo")
        .select("*");
      if (error) {
        throw error;
      }
      const infoList = [];
      for (let index = 0; index < info.length; index++) {
        infoList.push(info[index]);
      }
      setInfo(infoList);
    }
    getData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold">사용자 정보</h1>
      <ul className="m-auto max-w-sm pt-10 space-y-1">
        {info.map((item, index) => (
          <li className="text-left" key={item.id}>
            <dl className="pt-2 border-b-2">
              <dt className="text-gray-600">사용자명</dt>
              <dd>{item.user_name}</dd>
            </dl>
            <dl className="pt-2 border-b-2">
              <dt className="text-gray-600">생년월일</dt>
              <dd>
                <DateFormatter timestamp={item.user_birthday!}></DateFormatter>
              </dd>
            </dl>
            <dl className="pt-2 border-b-2">
              <dt className="text-gray-600">취미</dt>
              <dd>{item.user_hobby}</dd>
            </dl>
          </li>
        ))}
      </ul>
      <div className="pt-10">
        <form action="/auth/logout" method="post">
          <button
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
