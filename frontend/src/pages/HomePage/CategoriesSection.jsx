import React from "react";
import { motion } from "framer-motion";
import CategoriesCard from "../../components/CategoriesCard";
import ScrollStack, { ScrollStackItem } from '../../components/ScrollStack'





const CategoriesSection = () => {
  return (
    <section className=" pt-10 px-margin-mobile md:px-margin-desktop w-full">
      <div className="font-headline-lg text-headline-lg text-primary">
        <motion.h2
          className="overflow-hidden whitespace-nowrap"
          initial={{ width: 0 }}
          whileInView={{
            width: "100%",
            transition: { duration: 2, ease: "easeInOut" },
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Core Categories
        </motion.h2>
      </div>

      <ScrollStack useWindowScroll={true}>
        <ScrollStackItem itemClassName="!p-0 !bg-transparent !border-none !shadow-none">
          <CategoriesCard
            title="Software"
            description="Cloud-native enterprise platforms and licenses."
            icon="terminal"
          />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="!p-0 !bg-transparent !border-none !shadow-none">
          <CategoriesCard
            title="Hardware"
            description="Robust server racks, networking, and workstations."
            icon="dns"
          />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="!p-0 !bg-transparent !border-none !shadow-none">
          <CategoriesCard
            title="Security"
            description="End-to-end encryption and threat detection."
            icon="admin_panel_settings"
          />
        </ScrollStackItem>
        <ScrollStackItem itemClassName="!p-0 !bg-transparent !border-none !shadow-none">
          <CategoriesCard
            title="Consulting"
            description="Strategic planning and digital transformation."
            icon="lightbulb"
          />
        </ScrollStackItem>
      </ScrollStack>
    </section >
  );
};

export default CategoriesSection;

