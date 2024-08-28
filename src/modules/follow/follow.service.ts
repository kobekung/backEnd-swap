import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowService {
  private followers: Record<number, Set<number>> = {};

  follow(userId: number, followUserId: number): string {
    if (!this.followers[userId]) {
      this.followers[userId] = new Set<number>();
    }

    this.followers[userId].add(followUserId);
    return `User ${userId} followed user ${followUserId}`;
  }

  unfollow(userId: number, unfollowUserId: number): string {
    if (this.followers[userId]) {
      this.followers[userId].delete(unfollowUserId);
      return `User ${userId} unfollowed user ${unfollowUserId}`;
    }
    return `User ${userId} is not following user ${unfollowUserId}`;
  }

  getFollowers(userId: number): number[] {
    return Array.from(this.followers[userId] || []);
  }
}
