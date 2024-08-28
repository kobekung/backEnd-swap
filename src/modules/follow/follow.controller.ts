import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId/follow/:followUserId')
  follow(@Param('userId') userId: number, @Param('followUserId') followUserId: number): string {
    return this.followService.follow(userId, followUserId);
  }

  @Delete(':userId/unfollow/:unfollowUserId')
  unfollow(@Param('userId') userId: number, @Param('unfollowUserId') unfollowUserId: number): string {
    return this.followService.unfollow(userId, unfollowUserId);
  }

  @Get(':userId/followers')
  getFollowers(@Param('userId') userId: number): number[] {
    return this.followService.getFollowers(userId);
  }
}
