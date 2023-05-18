import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ActivityWithPopover from "../activity/ActivityWithPopover";
import { NormalizedUpcomingActivities } from "./getUpcomingActivities";
import UpcomingActivityItem from "./UpcomingActivityItem";
import { Fragment } from "react";

interface UpcomingActivitiesSectionProps {
  title: string;
  groupedActivities: NormalizedUpcomingActivities;
}

function UpcomingActivitiesSection({
  title,
  groupedActivities,
}: UpcomingActivitiesSectionProps) {
  return (
    <section className="mx-auto p-4 max-w-md grid gap-4">
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-6 gap-2">
            {groupedActivities.map(([groupId, group]) => {
              return (
                <Fragment key={groupId}>
                  {group.activities.map((activity, index) => (
                    <UpcomingActivityItem
                      isFirstInGroup={index === 0}
                      isLastInGroup={index === group.activities.length - 1}
                      key={activity.activityId}
                      activity={activity}
                    />
                  ))}
                </Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default UpcomingActivitiesSection;