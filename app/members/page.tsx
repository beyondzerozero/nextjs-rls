"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

/**
 * 팀별 직원 목록
 */
const Members = () => {
  const supabase = createClientComponentClient();
  const [members, setMembers] = useState<string[]>([]);
  useEffect(() => {
    async function getData() {
      const { data: members, error } = await supabase
        .from("members")
        .select("*");
      if (error) {
        throw error;
      }
      const memberList = [];
      for (let index = 0; index < members.length; index++) {
        memberList.push(members[index]["user_name"]);
      }
      setMembers(memberList);
    }
    getData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <h1 className="text-2xl font-bold">팀 직원명단</h1>
      <ul className="m-auto max-w-sm pt-10 space-y-1">
        {members.map((item, index) => (
          <li className="pt-2 text-left border-b-2" key={index}>
            {item}
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

export default Members;
